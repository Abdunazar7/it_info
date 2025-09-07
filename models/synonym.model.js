const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Synonym = sequelize.define(
  "synonym",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Synonym;
