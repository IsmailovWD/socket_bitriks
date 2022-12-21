const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser')
const i18n = require('./i18n.config')
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/user.route');
const roomRouter = require('../routes/room.route');
const messsageRouter = require('../routes/message.route');
const HttpException = require('../utils/HttpException.utils');
const orderRoute = require('../routes/order.route');

module.exports = async function(app){
     // parse requests of content-type: application/json
        // parses incoming requests with JSON payloads
        app.use(express.json());
        // enabling cors for all requests by using cors middleware
        app.use(cors());
        // Enable pre-flight
        app.options("*", cors());
        app.use(express.static(path.join(__dirname, '../../dist')));
        // i18n.setLocale('uz');
        app.use(cookieParser());
        app.use(i18n.init)

        app.use(`/api/v1/users`, userRouter);
        app.use(`/api/v1/room`, roomRouter)
        app.use(`/api/v1/message`, messsageRouter)
        app.use(`/api/v1/order`, orderRoute)
        // 404 error
        app.all('*', (req, res, next) => {
            const err = new HttpException(404, req.mf('Endpoint not found'));
            next(err);
        });

        app.use(errorMiddleware);
}