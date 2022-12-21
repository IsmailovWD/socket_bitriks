const RoomModel = require('../models/room.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const moment = require('moment');
/******************************************************************************
 *                              Room Controller
 ******************************************************************************/
class RoomController extends BaseController {
    getAll = async (req, res, next) => {
        let modelList = await RoomModel.findAll({});
        res.send(modelList);
    };

    getById = async (req, res, next) => {
        const data = await RoomModel.findOne({
            where:{ id: req.params.id }
        });

        if (!data) {
            throw new HttpException(404, req.mf('data not found'));
        }

        res.send(data);
    };

    create = async (req, res, next) => {
        this.checkValidation(req);
        let { 
            name,
            
        } = req.body;

        const model = await RoomModel.create({
          name
        });

        if (!model) {
            throw new HttpException(500, req.mf('Something went wrong'));
        }

        res.status(201).send(model);
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        let { 
           name
        } = req.body;

        const model = await RoomModel.findOne({ where: { id: req.params.id }} );

        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }
        model.name = name;
        model.save();
        res.send(model);
    };

    delete = async (req, res, next) => {
        const model = await RoomModel.findOne({ where : { id: req.params.id } })
        
        if (!model) {
            throw new HttpException(404, req.mf('data not found'));
        }

        try {
            await model.destroy({ force: true });
        } catch (error) {
            await model.destroy();
        }

        res.send(req.mf('data has been deleted'));
    };
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new RoomController;