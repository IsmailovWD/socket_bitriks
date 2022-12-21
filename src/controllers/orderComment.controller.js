const { Order, OrderComment } = require('../models/init-models');
const HttpException = require('../utils/HttpException.utils');
const BaseController = require('./BaseController');
const sequelize = require('sequelize');
/******************************************************************************
 *                              OrderComment Controller
 ******************************************************************************/
class OrderCommentController extends BaseController {

    create = async (req, res, next) => {
        let time = Math.floor(new Date().getTime() / 1000);
        let {
            datetime,
            order_id,
            user_id,
            comment
        } = req.body;

        const model = await OrderComment.create({
            datetime: time,
            order_id,
            user_id,
            comment
        })

        res.send({
            success: true,
            message: "Order Comment create",
            data: model
        })
    }

    // all = async (req, res, next) => {
    //     const model = await OrderComment.findAll()

    //     if (!model) {
    //         throw new HttpException(500, req.mf('Nimadir noto\'g\'ri bajarildi'));
    //     }

    //     res.send({
    //         success: true,
    //         message: "All Orders",
    //         data: model
    //     })
    // };

    // one = async (req, res, next) => {
    //     const model = await OrderComment.findAll({
    //         where: {
    //             order_id: parseInt(req.params.id)
    //         },
    //     })

    //     if (!model) {
    //         throw new HttpException(500, req.mf('Nimadir noto\'g\'ri bajarildi'));
    //     }

    //     res.send({
    //         success: true,
    //         message: 'One Order',
    //         data: model
    //     })
    // };

    update = async (req, res, next) => {
        this.checkValidation(req);
        
        let {
            order_id,
            user_id,
            comment
        } = req.body;

        const model = await OrderComment.findOne({
            where: {
                id: req.params.id
            },
        });
        
        model.order_id = order_id;
        model.user_id = user_id;
        model.comment = comment;
        await model.save();
        model.save()

        res.send({
            success: true,
            message: 'Update Order',
            data: model
        })
    };

    // delete = async (req, res, next) => {
    //     await OrderComment.destroy({
    //         where: {
    //             id: req.params.id
    //         }
    //     })

    //     res.send('Tanlangan ma\'lumotlar o\'chirildi')
    // };
};

module.exports = new OrderCommentController;