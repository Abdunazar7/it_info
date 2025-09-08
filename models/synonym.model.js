const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Synonym = sequelize.define(
  "synonym",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "updated_date",
  }
);

module.exports = Synonym;
