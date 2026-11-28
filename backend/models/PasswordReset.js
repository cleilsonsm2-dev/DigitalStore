const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PasswordReset = sequelize.define("PasswordReset", {
  tokenHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },

  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = PasswordReset;