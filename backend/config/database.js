const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('HandMade', 'Molka', '123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
