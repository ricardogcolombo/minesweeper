const mariadb= require("mariadb");
const {DB_HOST,DB_USER,DB_PASS} = require("../config");
const connectionDetails = {
     host: DB_HOST,
     user:DB_USER, 
     password: DB_PASS,
     connectionLimit: 5
}
const pool = mariadb.createPool(connectionDetails);
module.exports = pool;
