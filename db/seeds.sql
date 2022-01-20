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
(1, Trey, Rogers, Head_Engineer, null),
(2, Shy, Wheeler, Software_Engineer, 1),
(3, Richard, Rogers, Head_of_Sales, null),
(4, Ian, Darland, Sales_Person, 3),
(5, Kelly, Golden, Account_Manager, null),
(6, Jay, Golden, Accountant, 5),
(7, Khaleesi, Drogo, Head_of_Legal_Team, null),
(8, Khal, Drogo, Lawyer, 7)