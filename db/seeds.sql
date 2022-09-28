INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Salesperson', 80000, 1),
('Sales Lead', 100000, 1),
('Engineer', 120000, 2),
('Lead Engineer', 150000, 2),
('Accountant', 125000, 3),
('Chief Financial Officer', 300000, 3),
('Lawyer', 190000, 4),
('Legal Team Lead', 250000, 4),
('Human Resources Employee', 80000, 5),
('Human Resources Director', 100000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jon', 'Snow', 1, 2),
('Jackie', 'Chan', 2, null),
('Will', 'Smith', 3, 4),
('Tyrion', 'Lannister', 4, null),
('Jaime', 'Lannister', 5, 6),
('Buzz', 'Lightyear', 6, null),
('Jonathan', 'Lee', 7, 8),
('Kobe', 'Bryant', 8, null),
('Lebron', 'James', 9, 10),
('Frodo', 'Baggins', 10, null);