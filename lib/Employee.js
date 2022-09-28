const db = require('../db/connection.js');

const employeeByManager = `
SELECT a.id, a.first_name, a.last_name, roles.title AS role, departments.name AS department, roles.salary AS salary, CONCAT_WS(' ', b.first_name, b.last_name) AS manager
FROM employees a
LEFT JOIN employees b ON a.manager_id = b.id
LEFT JOIN roles ON a.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
ORDER BY manager`;

const employeeByDepartment = `
SELECT a.id, a.first_name, a.last_name, roles.title AS role, departments.name AS department, roles.salary AS salary, CONCAT_WS(' ', b.first_name, b.last_name) AS manager
FROM employees a
LEFT JOIN employees b ON a.manager_id = b.id
LEFT JOIN roles ON a.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
ORDER BY department`;

const employeePrompt = [
    {
        type: 'input',
        name: 'first',
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'last',
        message: "What is the employee's last name?"
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: ['Salesperson', 'Sales Lead', 'Engineer', 'Lead Engineer', 'Accountant', 'Chief Financial Officer', 'Lawyer', 'Legal Team Lead', 'Human Resources Employee', 'Human Resources Director']
    },
    {
        type: 'confirm',
        name: 'confirmManager',
        message: 'Does this employee have a manager?',
        default: true
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['Jon Snow', 'Jackie Chan', 'Will Smith', 'Tyrion Lannister', 'Jaime Lannister', 'Buzz Lightyear', 'Jonathan Lee', 'Kobe Bryant', 'Lebron James', 'Frodo Baggins'],
        when: ({ confirmManager }) => {
            if (confirmManager) {
                return true;
            } else {
                return false;
            }
        }
    }
];

const getId = (employeeX) => {
    let employeeId;

    if (employeeX === 'Jon Snow') {employeeId = 1}
    if (employeeX === 'Jackie Chan') {employeeId = 2}
    if (employeeX === 'Will Smith') {employeeId = 3}
    if (employeeX === 'Tyrion Lannister') {employeeId = 4}
    if (employeeX === 'Jaime Lannister') {employeeId = 5}
    if (employeeX === 'Buzz Lightyear') {employeeId = 6}
    if (employeeX === 'Jonathan Lee') {employeeId = 7}
    if (employeeX === 'Kobe Bryant') {employeeId = 8}
    if (employeeX === 'Lebron James') {employeeId = 9}
    if (employeeX === 'Frodo Baggins') {employeeId = 10}

    return employeeId;
}

const employeeInsert = (({ first, last, role, manager, confirmManager }) => {
    let managerId;

    if (confirmManager === false) {
        managerId = null;
    } else {
        managerId = getId(manager);
    }
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM roles WHERE title = ?), ?)`;
    const params = [first, last, role, managerId];
    db.query(sql, params, (err, res) => {});
});

const employeeUpdatePrompt = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: ['Jon Snow', 'Jackie Chan', 'Will Smith', 'Tyrion Lannister', 'Jaime Lannister', 'Buzz Lightyear', 'Jonathan Lee', 'Kobe Bryant', 'Lebron James', 'Frodo Baggins']
    },
    {
        type: 'list',
        name: 'newRole',
        message: 'What is their new role?',
        choices: ['Salesperson', 'Sales Lead', 'Engineer', 'Lead Engineer', 'Accountant', 'Chief Financial Officer', 'Lawyer', 'Legal Team Lead', 'Human Resources Employee', 'Human Resources Director']
    },
    {
        type: 'confirm',
        name: 'confirmUpdateManager',
        message: "Does this employee's manager need to be updated?",
        default: true
    },
    {
        type: 'list',
        name: 'newManager',
        message: "Who is the employee's new manager?",
        choices: ['Jon Snow', 'Jackie Chan', 'Will Smith', 'Tyrion Lannister', 'Jaime Lannister', 'Buzz Lightyear', 'Jonathan Lee', 'Kobe Bryant', 'Lebron James', 'Frodo Baggins'],
        when: ({ confirmUpdateManager }) => {
            if (confirmUpdateManager) {
                return true;
            } else {
                return false;
            }
        }
    }
]

const employeeUpdateReturn = (({ newRole, employee, confirmUpdateManager, newManager }) => {
    const employeeId = getId(employee);

    let managerId;
    if (confirmUpdateManager === true) {
        managerId = getId(newManager)
    }

    const sql = `UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = ?), manager_id = ? WHERE id = ?`;
    const params = [newRole, managerId, employeeId];
    db.query(sql, params, (req, res) => {})
});

employeeDestroyPrompt = [
    {
        type: 'list',
        name: 'destroyEmployee',
        message: 'Which employee would you like to remove?',
        choices: ['Jon Snow', 'Jackie Chan', 'Will Smith', 'Tyrion Lannister', 'Jaime Lannister', 'Buzz Lightyear', 'Jonathan Lee', 'Kobe Bryant', 'Lebron James', 'Frodo Baggins']
    }
];

employeeDestroyInsert = (({ destroyEmployee }) => {
    const sql = `DELETE FROM employees WHERE CONCAT_WS(' ', first_name, last_name) = ?`;
    const params = [destroyEmployee];
    db.query(sql, params, (err, res) => {});
});

module.exports = {
    employeeByManager,
    employeeByDepartment,
    employeePrompt,
    employeeInsert,
    employeeUpdatePrompt,
    employeeUpdateReturn,
    employeeDestroyPrompt,
    employeeDestroyInsert
};