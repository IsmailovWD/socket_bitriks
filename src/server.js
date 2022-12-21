const express = require("express");
const app = express();
const { User, Status, Order, StatusRegister, Client, Region, Activity, Program, Source, Company, OrderComment } = require('./models/init-models');
const MessageModel = require('./models/message.model');
require('./startup/logging')();
require('./startup/db')();
const {port} = require('./startup/config');
require('./startup/routes')(app);
require('./startup/migration')();
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');

const server = app.listen(port, () => console.log(`🚀 Server running on port ${port}!`))
.on('error', (e) => {
    console.log('Error happened: ', e.message)
});
const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true
    }
});
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET_JWT);
        socket.userId = payload.user_id;
        next();
    } catch (err) {}
});
io.on('connection', (socket) => {
    console.log("Connected: " + socket.userId);
    // Order
    socket.on('orderCreate', async(data) => {
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
        } = data;
        
        const model = await Order.create({
            datetime: time,
            user_id: socket.userId,
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
        const datas = await Order.findOne({
            where: {
                id: model.id
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
        io.emit('newOrder', datas)
    })
    socket.on('orderUpdate', async(data) => {
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
        } = data;

        const model = await Order.findOne({
            where: {
                id: data.id
            },
        });
        model.user_id = socket.userId;
        model.client_id = client_id;
        model.phone_number = phone_number;
        model.status_id = status_id;
        model.region_id = region_id;
        model.activity_id = activity_id;
        model.program_id = program_id;
        model.source_id = source_id;
        model.summa = summa;
        model.comment = comment;
        model.company_id = company_id;
        await model.save();
        const datas = await Order.findOne({
            where: {
                id: model.id
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
        await io.emit('newUpdate', datas)
    })
    socket.on('orderSplice', async(data) => {
        await io.emit('newSplice', data)
    })
    // OrderComment
    socket.on('commentCreate', async(data) => {
        let time = Math.floor(new Date().getTime() / 1000);
        let {
            order_id,
            comment
        } = data;

        const model = await OrderComment.create({
            datetime: time,
            order_id,
            user_id: socket.userId,
            comment
        })

        const datas = await OrderComment.findOne({
            where: {
                id: model.id
            },

            attributes: [
                'id',
                'datetime',
                'user_id',
                'order_id',
                [sequelize.literal('user.username'), 'operator'],
                'comment'
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                },
            ]
        })
        io.emit('newComment', datas)
    })
    socket.on('commentUpdate', async(data) => {
        let {
            order_id,
            comment
        } = data;

        const model = await OrderComment.findOne({
            where: {
                id: data.id,
            }
        })
        model.datetime = datetime;
        model.user_id = socket.userId;
        model.order_id = order_id;
        model.comment = comment;
        await model.save();

        const datas = await OrderComment.findOne({
            where: {
                id: model.id,
            },

            attributes: [
                'id',
                'datetime',
                'user_id',
                'order_id',
                [sequelize.literal('user.username'), 'operator'],
                'comment'
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [],
                },
            ]
        })
        io.emit('newUpdateComment', datas)

    })

    socket.on("disconnect", () => {
        console.log("Disconnected: " + socket.userId);
    });
})
module.exports = app;