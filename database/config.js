// database/config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("websiter", "root", "", {
    dialect: "mysql",
    host: "127.0.0.1",
    //login: "false"
});

module.exports = { sequelize };


