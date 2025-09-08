const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DescTopic = sequelize.define(
  "desc_topic",
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

module.exports = DescTopic;
