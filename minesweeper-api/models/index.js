const Sequelize = require("sequelize");
const {DB_NAME, DB_HOST, DB_USER, DB_PASS} = require("../config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mariadb',
    dialectOptions: {
        connectionLimit:5
  }});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.usergames= require("../models/usergames.model.js")(sequelize, Sequelize);
db.games= require("../models/games.model.js")(sequelize, Sequelize);

module.exports = db;
