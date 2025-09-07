const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Tag = sequelize.define(
  "tag",
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

module.exports = Tag;
