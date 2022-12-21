const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');


router.get('/', auth(), awaitHandlerFactory(messageController.getAll));
router.get('/room_id/:id', auth(), awaitHandlerFactory(messageController.getByRoomId));

module.exports = router;