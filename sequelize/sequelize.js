const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    dialect: 'mysql'
})

module.exports = sequelize