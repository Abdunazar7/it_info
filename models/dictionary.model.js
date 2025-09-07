const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Dictionary = sequelize.define(
  "dictionary",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Dictionary;
