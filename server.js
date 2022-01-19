const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const config = require('./package.json');
const consTbl = require('console.table');
console.log(logo(config).render());

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Lovepop4ever',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  