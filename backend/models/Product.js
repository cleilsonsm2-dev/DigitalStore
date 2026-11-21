const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Product;