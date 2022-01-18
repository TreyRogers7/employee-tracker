INSERT INTO department (id, name)
VALUES 
(1, Engineering),
(2, Sales),
(3, Finance),
(4, Legal)

INSERT INTO roles (id, title, department_id, salary)
VALUES
(1, Head_Engineer, Engineering, 250000),
(2, Software_Engineer, Engineering, 175000),
(3, Head_of_Sales, Sales, 150000),
(4, Sales_Person, Sales, 'comission'),
(5, Account_Manager, Finance, 125000),
(6, Accountant, Finance, 75000),
(7, Head_of_Legal_Team, Legal, 200000),
(8, Lawyer, Legal, 100000)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, Trey, Rogers, Head_Engineer),
(2, Shy, Wheeler, Software_Engineer, Trey_Rogers),
(3, Richard, Rogers, Head_of_Sales),
(4, Ian, Darland, Sales_Person, Richard_Rogers),
(5, Kelly, Golden, Account_Manager),
(6, Jay, Golden, Accountant, Kelly-Golden),
(7, Khaleesi, Drogo, Head_of_Legal_Team),
(8, Khal, Drogo, Lawyer, Khaleesi_Drogo)