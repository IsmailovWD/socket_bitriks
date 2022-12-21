const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { orderSchema } = require('../middleware/validators/orderValidator.middleware')

router.post('/create', auth(), joiMiddleware(orderSchema.create), awaitHandlerFactory(orderController.create))
router.get('/all', auth(), awaitHandlerFactory(orderController.all))
router.get('/change/:id', auth(), awaitHandlerFactory(orderController.one))
router.patch('/update/:id', auth(), joiMiddleware(orderSchema.update), awaitHandlerFactory(orderController.update))
router.delete('/delete/:id', auth(), awaitHandlerFactory(orderController.delete))


module.exports = router;