const { DataTypes } = require('sequelize')
const sequelize = require('../sequelize/sequelize')

const Product = sequelize.define('products', {
    productName: {
        type: DataTypes.STRING,
        allowNull: true
    },  
    price: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
})

module.exports = Product