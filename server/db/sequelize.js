const {Sequelize, QueryTypes} = require('sequelize');

const sequelize = new Sequelize('dashboard', 'postgres', 'javascript6', {
  host: 'localhost',
  dialect: 'postgres',
})

const Customer = require('../models/Customer')(sequelize);
const Address = require('../models/Address')(sequelize, Customer);

Customer.hasMany(Address, {
  foreignKey: 'customer_id',
  onDelete: 'CASCADE',
});
Address.belongsTo(Customer, {
  foreignKey: 'customer_id',
});


module.exports = {
  QueryTypes,
  sequelize,
  Customer,
  Address
};
