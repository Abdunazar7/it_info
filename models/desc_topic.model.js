const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const DescTopic = sequelize.define(
  "desc_topic",
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

module.exports = DescTopic;
