const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productImage: {
        type: DataTypes.JSON, 
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: true, 
});

module.exports = Product;
