// Import inquirer
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require("mysql2");
// Import asciiart
const logo = require("asciiart-logo");
const config = require("./package.json");
require('dotenv').config();
// Import console.table
const table = require("console.table");
console.log(logo(config).render());

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
db.connect(function(err){
  if (err) 
  console.log(err)
  else console.log('connection established')
})

function mainPrompt() {
  inquirer
    .prompt([{
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
    }])
    .then(({ task }) => {
      console.log(task)
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
};

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

    mainPrompt();
  });
  
};

const addEmployee = () => {
  let query = `select role.id, role.title, role.salary from role`;
  db.query(query, (err, res) => {
    if (err) throw err;
    
    const roleChoices = res.map(({ id, title, salary}) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));
    console.table(res);
    rolePrompts(roleChoices);
  });
};

  const rolePrompts = (roleChoices) => {
    inquirer
    .prompt([
      {
        type: "list",
        name: "roleId",
        message: "What is the Employees role?",
        choices: roleChoices,  
      },
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the New Hires First Name?'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the New Hires Last Name?'
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Please Enter New Hires Manager ID'
      }
    ])
    .then((results) => {
      console.log(results)

      let query = `Insert into employee db.`;
      db.query(query, {
        role_id: results.role_id,
        first_name: results.first_name,
        last_name: results.last_name,
        manager_id: results.manager_id
      }, (err, res) => {
        if (err) throw err

        console.table(res);
        mainPrompt();
      });
    });
  };


const updateEmployeeRole = () => {

  mainPrompt();
};

const viewAllRoles = () => {

  mainPrompt();
};

const addRole = () => {

  mainPrompt();
};

const addDepartment = () => {

  mainPrompt();
};


mainPrompt();
