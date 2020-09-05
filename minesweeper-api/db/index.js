const Pool = require("pg").Pool;
const {DATABASE} = require("../config");
const pool = new Pool({connectionString:DATABASE,ssl:false});

module.exports = pool;
