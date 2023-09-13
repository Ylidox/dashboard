const Router = require('express');
const router = new Router();
const customerController = require('../controllers/CustomerController');

router.get('/get', customerController.getCustomer);
router.put('/change', customerController.changeCustomer);
router.post('/add', customerController.addCustomer);
router.delete('/delete', customerController.deleteCustomer);

module.exports = router;

