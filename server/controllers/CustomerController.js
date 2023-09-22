let {QueryTypes, sequelize, Customer} = require('../db/sequelize');

class CustomerController{
  async getCustomersByPage(req, res){
    try{
      const {page} = req.query;
      const pageSize = 10;
      const offset = page * pageSize;
      let result = await sequelize.query(`select * from customer limit ${pageSize} offset ${offset}`, {
        raw: false,
        type: QueryTypes.SELECT,
      });
      if(result.length == 0) throw new Error('Массив result пуст');
      
      const count = await sequelize.query('select count(id) from customer', {
        raw: false,
        type: QueryTypes.SELECT
      });

      res.json({
        count: count[0].count,
        rows: result,
      });
    }catch(e){
      console.log(e.message);
      res.status(404).json({message: e.message});
    }
  }
  async getCustomerById(req, res){
    try{
      let {id} = req.params;
      if(!id) throw new Error(`Не найден customer_id в params`);
      
      let result = await Customer.findAll({
        where: {
          id,
        },
      })
      if(result.length == 0) throw new Error(`Не найден customer по id: ${id}`);
      res.json(result[0])
    }catch(e){
      console.log(e.message);
      res.status(404).json({message:'Пользователь не найден'});
    }
  }
  async getCustomersOnExpenses(req, res){
    try{
      let customers = await Customer.findAll({
        order: [['expenses', 'DESC']],
        limit: 10,
      });
      res.status(200).json(customers);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
  }
  async getCustomersByAddressesCount(req, res){
    try{
      let ans = await sequelize.query(`
        select customer.id, customer.lastname, customer.name, count(address.id) AS count
        from customer
        left join address ON customer.id = address.customer_id
        group by customer.id
        order by count desc
        limit 10;
      `);
      // let ans = await res.json();
      res.status(200).json(ans[0]);
    }catch(e){
      console.log(e.message);
      res.status(404).json(e.message);
    }
  }
  async addCustomer(req, res){
    try{
      let customer = req.body;
      await Customer.create(customer);
      res.status(200).json({message: 'Пользователь добавлен'});
    }catch(e){
      console.log(e.message);
      res.status(404).json({message:'Невозможно добавить пользователя'})
    }
  }
  async changeCustomer(req, res){
    try{
      let customer = req.body;
      await Customer.update(
        customer, 
        {where: {
          id: customer.id
        }}
      );
      res.status(200).json({message: 'Пользователь обновлен'});
    }catch(e){
      console.log(e.message);
      res.status(404).json({message:'Пользователь не обновлен'});
    }
  }
  async deleteCustomer(req, res){
    try{
      let {id} = req.params;
      await Customer.destroy({where: {id}});
      res.status(200).json({message: 'Пользователь удален'})
    }catch(e){
      console.log(e);
      res.status(404).json({message:'Пользователь не найден'});
    }
  }
}

module.exports = new CustomerController();