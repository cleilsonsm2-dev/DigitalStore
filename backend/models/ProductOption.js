const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductOption = sequelize.define("ProductOption", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  value: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = ProductOption;