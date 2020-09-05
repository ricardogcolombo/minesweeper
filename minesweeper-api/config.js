require("dotenv").config();

const path = require("path");
const envFileName = `.env${process.env.NODE_ENV && `.${process.env.NODE_ENV}`}`;
const pathToEnvFile = path.resolve(__dirname, envFileName);
require("dotenv").config({path: pathToEnvFile});
module.exports = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || "0.0.0.0",
    DATABASE:process.env.DATABASE
};
