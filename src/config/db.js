const { sequelize, Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'fintrack',
    'root',
    'password',
      {
    host: 'localhost',
    dialect: 'mysql'
  }
)
module.exports = sequelize;