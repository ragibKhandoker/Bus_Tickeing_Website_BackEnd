// models/TestTable.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TestTable = sequelize.define('TestTable', {
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = TestTable;
