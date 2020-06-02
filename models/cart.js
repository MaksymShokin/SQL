const Sequelize = require('sequelize').Sequelize;

const sequelize = require('../helpers/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
})

module.exports = Cart