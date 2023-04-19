const { Sequelize, INTEGER, STRING } = require("sequelize");
const config = require("./db.config");

const User = require("./models/user");

const sequelizeInstance = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: "postgres",

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

db.users = User(sequelizeInstance, Sequelize);

// module.exports = db;

module.exports = { db };
