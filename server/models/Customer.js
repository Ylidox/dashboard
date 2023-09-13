const Sequelize = require('sequelize');

module.exports = function(sequelize){
  return sequelize.define('customer', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    expenses: {
      type: Sequelize.FLOAT,
    },
    blocked: {
      type: Sequelize.BOOLEAN,
    },
    registration_date: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'customer',
    timestamps: false,
  })
}