const { User, Status, Order, StatusRegister, Client, Region, Activity, Program, Source, Company } = require('../models/init-models');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret_jwt } = require('../startup/config');
const BaseController = require('./BaseController');
const { MyUser, MainUser } = require('../utils/userRoles.utils');
const sequelize = require('sequelize');
const moment = require('moment');
/******************************************************************************
 *                              Order Controller
 ******************************************************************************/
class OrderController extends BaseController {

    create = async (req, res, next) => {

        this.checkValidation(req);
        let time = Math.floor(new Date().getTime() / 1000);
        let {
            client_id,
            phone_number,
            status_id,
            region_id,
            activity_id,
            program_id,
            source_id,
            company_id,
            summa,
            comment
        } = req.body;
        
        const model = await Order.create({
            datetime: time,
            user_id: req.currentUser.id,
            client_id,
            phone_number,
            status_id,
            region_id,
            activity_id,
            program_id,
            source_id,
            company_id,
            summa,
            comment
        })
        // this.#orderComment(model, 1)
        this.#register(model, 1)
        if (!model) {
            throw new HttpException(500, req.mf('Nimadir noto\'g\'ri bajarildi'));
        }
       

        res.send({
            success: true,
            message: "Create Order",
            data: model
        })
    };

    all = async (req, res, next) => {
        const model = await Order.findAll(
        {
            attributes: [
                'id',
                'datetime',
                'user_id',
                'client_id',
                [sequelize.literal('user.username'), 'operator'],
                [sequelize.literal('client.fullname'), 'client_name'],
                'phone_number',
                [sequelize.literal('status.name'),'status_name'],
                [sequelize.literal('region.name'),'region_name'],
                [sequelize.literal('activity.name'), 'activity_name'],
                [sequelize.literal('program.name'), 'program_name'],
                [sequelize.literal('source.name'),'source_name'],
                [sequelize.literal('company.name'), 'company_name'],
                'status_id',
                'program_id',
                'region_id',
                'activity_id',
                'source_id',
                'company_id',
                'summa',
                'comment'
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                },
                {
                    model: Client,
                    as: 'client',
                    attributes: [],
                },
                {
                    model: Status,
                    as: 'status',
                    attributes: [],
                },
                {
                    model: Region,
                    as: 'region',
                    attributes: [],
                },
                {
                    model: Activity,
                    as: 'activity',
                    attributes: [],
                },
                {
                    model: Program,
                    as: 'program',
                    attributes: [],
                },
                {
                    model: Source,
                    as: 'source',
                    attributes: [],
                },
                {
                    model: Company,
                    as: 'company',
                    attributes: [],
                },
            ],
            where: {
                status_id: parseInt(req.query.status),
            },
            offset: parseInt(req.query.offset),
            limit: 100,
        }
        )

        if (!model) {
            throw new HttpException(500, req.mf('Nimadir noto\'g\'ri bajarildi'));
        }

        res.send({
            success: true,
            message: "All Orders",
            data: model
        })
    };

    one = async (req, res, next) => {
        const model = await Order.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'datetime',
                'user_id',
                'client_id',
                [sequelize.literal('user.username'), 'operator'],
                [sequelize.literal('client.fullname'), 'client_name'],
                'phone_number',
                [sequelize.literal('status.name'),'status_name'],
                [sequelize.literal('region.name'),'region_name'],
                [sequelize.literal('activity.name'), 'activity_name'],
                [sequelize.literal('program.name'), 'program_name'],
                [sequelize.literal('source.name'),'source_name'],
                [sequelize.literal('company.name'), 'company_name'],
                'status_id',
                'program_id',
                'region_id',
                'activity_id',
                'source_id',
                'company_id',
                'summa',
                'comment'
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                },
                {
                    model: Client,
                    as: 'client',
                    attributes: [],
                },
                {
                    model: Status,
                    as: 'status',
                    attributes: [],
                },
                {
                    model: Region,
                    as: 'region',
                    attributes: [],
                },
                {
                    model: Activity,
                    as: 'activity',
                    attributes: [],
                },
                {
                    model: Program,
                    as: 'program',
                    attributes: [],
                },
                {
                    model: Source,
                    as: 'source',
                    attributes: [],
                },
                {
                    model: Company,
                    as: 'company',
                    attributes: [],
                },
            ],
        })

        if (!model) {
            throw new HttpException(500, req.mf('Nimadir noto\'g\'ri bajarildi'));
        }

        res.send({
            success: true,
            message: 'One Order',
            data: model
        })
    };

    update = async (req, res, next) => {
        this.checkValidation(req);
        
        let {
            client_id,
            phone_number,
            status_id,
            region_id,
            activity_id,
            program_id,
            source_id,
            summa,
            comment,
            delete_at
        } = req.body;

        const model = await Order.findOne({
            where: {
                id: req.params.id
            },
        });
        // const sts = await StatusRegister.destroy({where:{id: model.id, status_id: model.status_id}})

        await this.#register(model, status_id)

        if (!model || !client_id) {
            throw new HttpException(404, req.mf('ma\'lumotlar topilmadi'));
        }
        
        model.user_id = req.currentUser.id;
        model.client_id = client_id;
        model.phone_number = phone_number;
        model.status_id = status_id;
        model.region_id = region_id;
        model.activity_id = activity_id;
        model.program_id = program_id;
        model.source_id = source_id;
        model.summa = summa;
        model.comment = comment;
        model.delete_at = delete_at;
        await model.save();
        model.save()

        res.send({
            success: true,
            message: 'Update Order',
            data: model
        })
    };

    delete = async (req, res, next) => {
        await Order.destroy({
            where: {
                id: req.params.id
            }
        })

        res.send('Tanlangan ma\'lumotlar o\'chirildi')
    };

    #register = async (model, id) => {
        let time = Math.floor(new Date().getTime() / 1000);

        await StatusRegister.create({
            datetime: time,
            order_id: model.id,
            operator_id: model.user_id,
            status_id: id
        })
    };

    // #orderComment = async (model, id) => {
    //     let time = Math.floor(new Date().getTime() / 1000);

    //     await Comment.create({
    //         datetime: time,
    //         order_id: model.id,
    //         user_id: model.user_id,
    //         comment: model.comment
    //     })
    // };
    
}

module.exports = new OrderController;