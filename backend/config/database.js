const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('handmade', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
