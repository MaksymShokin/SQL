const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-shop', 'root', 'uu5ilolpimP123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
