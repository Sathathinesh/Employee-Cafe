const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    tableName: 'employees'
});

module.exports = Employee;
