INSERT INTO department (id, name)
VALUES 
(1, Engineering),
(2, Sales),
(3, Finance),
(4, Legal)

INSERT INTO roles (id, title, department_id, salary)
VALUES
(1, Head Engineer, Engineering, 250000),
(2, Software Engineer, Engineering, 175000),
(3, Head of Sales, Sales, 150000),
(4, Sales Person, Sales, 'comission'),
(5, Account Manager, Finance, 125000),
(6, Accountant, Finance, 75000),
(7, Head of Legal Team, Legal, 200000),
(8, Lawyer, Legal, 100000)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, Trey, Rogers, Head Engineer),
(2, Shy, Wheeler, Software Engineer, Trey Rogers),
(3, Richard, Rogers, Head of Sales),
(4, Ian, Darland, Sales Person, Richard Rogers),
(5, Kelly, Golden, Account Manager),
(6, Jay, Golden, Accountant, Kelly Golden),
(7, Khaleesi, Drogo, Head of Legal Team),
(8, Khal, Drogo, Lawyer, Khaleesi Drogo)