// Import inquirer
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
// Import asciiart
const logo = require("asciiart-logo");
const config = require("./package.json");
require("dotenv").config();
// Import console.table
const table = require("console.table");
console.log(logo(config).render());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect(function (err) {
  if (err) console.log(err);
  else console.log("connection established");
});

function mainPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Departments",
          "Quit",
        ],
      },
    ])
    .then(({ task }) => {
      console.log(task);
      switch (task) {
        case "View All Employees":
          viewEmployeeList();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "Add Departments":
          addDepartment();
          break;

        case "Quit":
          db.end();
          break;
      }
    });
}

const viewEmployeeList = () => {
  let query = `select employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name,' ',manager.last_name) as manager from employee LEFT JOIN role
  ON employee.role_id = role.id
  LEFT JOIN department
  ON department.id = role.department_id
  LEFT JOIN employee manager
  ON manager.id = employee.manager_id`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    console.log('employees displayed')

    mainPrompt();
  });
};

const addEmployee = async () => {
  let query = `select role.id, role.title, role.salary from role`;
  db.query(query, (err, res) => {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      name: title,
    }));
    console.table(res);
    rolePrompts(roleChoices);
  });
};

const rolePrompts = async (roleChoices) => {
  const dbEmployees = await db.promise().query(`select * from employee`);
  const mgrList = dbEmployees[0].map((employee) => ({
    value: employee.id,
    name: `${employee.first_name} ${employee.last_name}`,
  }));
  const results = await inquirer.prompt([
    {
      type: "list",
      name: "role_id",
      message: "What is the Employees role?",
      choices: roleChoices,
    },
    {
      type: "input",
      name: "first_name",
      message: "What is the New Hires First Name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the New Hires Last Name?",
    },
    {
      type: "list",
      name: "manager_id",
      message: "Please Enter New Hires Manager.",
      choices: mgrList,
    },
  ]);

  console.log(results);

  let query = `Insert into employee set ?`;
  const res = await db.promise().query(query, {
    role_id: results.role_id,
    first_name: results.first_name,
    last_name: results.last_name,
    manager_id: results.manager_id,
  });
  console.table(res[0]);

  console.log('A new employee has been hired')
  mainPrompt();
};

const updateEmployeeRole = async () => {
  const dbEmployees = await db.promise().query(`select * from employee`);
  const employeeList = dbEmployees[0].map((employee) => ({
    value: employee.id,
    name: `${employee.first_name} ${employee.last_name}`,
  }));
  const dbRoles = await db.promise().query(`select * from role`);
  const roleList = dbRoles[0].map((role) => ({
    value: role.id,
    name: role.title
  }));
  const results = await inquirer
  .prompt ([
    {
      type: 'list',
      name: 'employee',
      message: 'Please select employee youd like to update',
      choices: employeeList
    },
    {
      type: 'list',
      name: 'role',
      message: 'Please select the role youd like to update',
      choices: roleList
    }
  ])

let query = `update employee set role_id = ? where id = ?`;
const res = await db.promise().query(query, [results.role, results.employee])

console.log('Your role has been updated')
  mainPrompt();
};

const viewAllRoles = async () => {
  const query = `select * from role`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    console.log('roles displayed')
    mainPrompt();
  });
};

const addRole = async () => {
  const dbDepartment = await db.promise().query(`select * from department`);
  const departmentList = dbDepartment[0].map(({ id, name }) => ({
    value: id,
    name: `${id} ${name}`
  }));  
  
  const addRolePrompts = await inquirer
  .prompt ([
    {
      type: 'input',
      name: 'title',
      message: 'Please enter the new role',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please input salary',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Please select the department belonging to this role',
      choices: departmentList
    }
  ])
  
  let query = `insert into role set ?`;
  const res = await db.promise().query(query, addRolePrompts)
  
  console.log('A new role has been added')
  mainPrompt();
};

const viewAllDepartments = async () => {
  const query = `select * from department`;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    console.log('Departments Displayed')
    mainPrompt();
    
  });
};
const addDepartment = async () => {
  const dbNewDepartment = await db.promise().query(`select * from department`);

  const newDepartmentPrompts = await inquirer
  .prompt ([
    {
    type: 'input',
    name: 'name',
    message: 'Please Enter New Department Name.'
    }
  ])

  let query = `insert into department set ?`;
  const res = await db.promise().query(query, newDepartmentPrompts)
  
  console.log('Department successfully added')
  mainPrompt();
};

mainPrompt();
