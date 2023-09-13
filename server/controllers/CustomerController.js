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
      res.json(result);
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