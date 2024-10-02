const sequelize = require('../config/database');
const Employee = require('./Employee');
const Cafe = require('./Cafe');
const EmployeeCafe = require('./EmployeeCafe');

Employee.belongsToMany(Cafe, { through: EmployeeCafe });
Cafe.belongsToMany(Employee, { through: EmployeeCafe });

sequelize.sync();

module.exports = { Employee, Cafe, EmployeeCafe };
