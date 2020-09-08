const mariadb= require("mariadb");
const {DB_NAME,DB_HOST,DB_USER,DB_PASS} = require("../config");
const connectionDetails = {
     host: DB_HOST,
     user:DB_USER, 
     password: DB_PASS,
     database:DB_NAME,
     connectionLimit: 100
}
const pool = mariadb.createPool(connectionDetails);
module.exports = pool;
