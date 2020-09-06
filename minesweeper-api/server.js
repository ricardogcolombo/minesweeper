const express = require("express");
var game= require('./api/game');
const config=  require('./config')
const app = express();
const middleware = require('./middleware')
const cors = require('cors')

middleware(app,config.HOST,config.PORT);
app.use('/api/v1',game)
app.use(cors())
app.use(function(error, req, res, next) {
    if (error.message.indexOf('Client')>-1 ) {
        res.status(404);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
});

module.exports= app
