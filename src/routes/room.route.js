const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const joiMiddleware = require('../middleware/joi.middleware');
const { roomSchemas } = require('../middleware/validators/roomValidator.middleware');


router.get('/', auth(), awaitHandlerFactory(roomController.getAll));
router.get('/id/:id', auth(), awaitHandlerFactory(roomController.getById));
router.post('/', auth(), joiMiddleware(roomSchemas), awaitHandlerFactory(roomController.create));
router.patch('/id/:id', auth(), joiMiddleware(roomSchemas), awaitHandlerFactory(roomController.update));
router.delete('/id/:id', auth(), awaitHandlerFactory(roomController.delete));

module.exports = router;