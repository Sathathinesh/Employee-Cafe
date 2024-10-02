const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');
const Cafe = require('./Cafe');

const EmployeeCafe = sequelize.define('EmployeeCafe', {
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
    tableName: 'employee_cafes',
});

module.exports = EmployeeCafe;
