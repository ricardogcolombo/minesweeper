require("dotenv").config();

const path = require("path");
const envFileName = `.env${process.env.NODE_ENV && `.${process.env.NODE_ENV}`}`;
const pathToEnvFile = path.resolve(__dirname, envFileName);
require("dotenv").config({path: pathToEnvFile});
module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || "0.0.0.0",
    DB_USER:process.env.DB_USER,
    DB_HOST:process.env.DB_HOST,
    DB_PASS:process.env.DB_PASS,
    DB_NAME:process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET || "TEST"
};
