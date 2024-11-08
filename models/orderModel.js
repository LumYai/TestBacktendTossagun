const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize/sequelize')

const Order = sequelize.define('order', {
    productName: {
        type: DataTypes.STRING,
        allowNull: true
    },  
    price: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELLED'),
        allowNull: true
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Order