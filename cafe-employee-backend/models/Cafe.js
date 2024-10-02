const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cafe = sequelize.define('Cafe', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    tableName: 'cafes'
});

module.exports = Cafe;
