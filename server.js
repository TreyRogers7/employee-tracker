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
// Connect to database
// const sequelize = require("./config/connection");
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

  // inquirer
  //   .prompt([
  //     {
  //       type: "list",
  //       name: "task",
  //       message: "What would you like to do?",
  //       choices: [
  //         { name: "View All Employees", value: "View All Employees" },
  //         "Add Employee",
  //         "Update Employee Role",
  //         "View All Roles",
  //         "Add Role",
  //         "View All Departments",
  //         "Add Departments",
  //         "Quit",
  //       ],
  //     },
  //   ])
  //   .then((result) => {
  //     console.log(result.task);
  //   });

function mainPrompt() {
  inquirer
    .prompt([{
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        { name: "View All Employees", value: "View All Employees" },
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Departments",
        "Quit",
      ],
    }])
    .then((task) => {
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
  const query = `select employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, concat(manager.first_name,' ',manager.last_name) as manager from employee LEFT JOIN role
  ON employee.role_id = role.id
  LEFT JOIN department
  ON department.id = role.department_id
  LEFT JOIN employee manager
  ON manager.id = employee.manager_id`;
  db.query(query, (err, res) => {
    if (err) throw err;
    table(res);

    mainPrompt();
  });

};

mainPrompt();
