const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Dictionary = sequelize.define(
  "dictionary",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    term: { type: DataTypes.STRING, allowNull: false, unique: true },
    letter: { type: DataTypes.STRING(1), allowNull: false, }
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "updated_date",
  }
);

module.exports = Dictionary;
