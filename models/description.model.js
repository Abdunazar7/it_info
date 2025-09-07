const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Category = require("./category.model");

const Description = sequelize.define(
  "description",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Description;
