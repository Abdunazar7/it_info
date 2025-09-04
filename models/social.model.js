const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Social = sequelize.define("social", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  social_name: { type: DataTypes.STRING, allowNull: false },
  social_icon_file: { type: DataTypes.STRING }
}, { freezeTableName: true, timestamps: true });

module.exports = Social;
