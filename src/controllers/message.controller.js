const MessageModel = require('../models/message.model');
const RoomModel = require('../models/room.model');
const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const moment = require('moment');
/******************************************************************************
 *                              Message Controller
 ******************************************************************************/
class MessageController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await MessageModel.findAll({});
        res.send(modelList);
    };
    
    getByRoomId = async (req, res, next) => {
        const data = await MessageModel.findAll({
            where:{ room_id: req.params.id },
            include: [
                {
                    model: RoomModel,
                    as: 'room',
                    required: false
                },
                {
                    model: UserModel,
                    as: 'user',
                    required: false
                }
        ]
        });

        if (!data) {
            throw new HttpException(404, req.mf('data not found'));
        }

        res.send(data);
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new MessageController;