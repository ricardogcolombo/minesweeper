const express = require("express");
var game= require('./api/game');
var auth= require('./api/auth');
const config = require("./config");
const app = express();
const {initBasicMiddleware} = require("./middleware");
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000"
}));
initBasicMiddleware(app, config.HOST, config.PORT);

app.use('/api/v1',game)
app.use('/api/v1',auth)


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

app.use(function (error, req, res, next) {
    if (error.message.indexOf("Client") > -1) {
        res.status(404);
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
    });
});

module.exports = app;
