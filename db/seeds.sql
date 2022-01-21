INSERT INTO department (id, name)
VALUES 
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role (id, title, department_id, salary)
VALUES
('Head_Engineer', 1, 250000),
('Software_Engineer', 2, 175000),
('Head_of_Sales', 1, 150000),
('Sales_Person', 2, 'comission'),
('Account_Manager', 1, 125000),
('Accountant', 2, 75000),
('Head_of_Legal_Team', 1, 200000),
('Lawyer', 2, 100000);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
('Trey', 'Rogers', 1, null),
('Shy', 'Wheeler', 2, 1),
('Richard', 'Rogers', 3, null),
('Ian', 'Darland', 4, 3),
('Kelly', 'Golden', 5, null),
('Jay', 'Golden', 6, 5),
('Khaleesi', 'Drogo', 7, null),
('Khal', 'Drogo', 8, 7);