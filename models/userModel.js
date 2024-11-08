const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize/sequelize')

const User = sequelize.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull:true
    },
    email: {
        type: DataTypes.STRING,
        allowNull:true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:true
    },
})

module.exports = User