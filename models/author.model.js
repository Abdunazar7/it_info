const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Author = sequelize.define(
  "author",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    phone: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    info: { type: DataTypes.TEXT },
    position: { type: DataTypes.STRING },
    is_expert: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = Author;
