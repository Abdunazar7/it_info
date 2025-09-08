const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Topic = sequelize.define(
  "topic",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    topic_title: { type: DataTypes.STRING, allowNull: false },
    topic_text: { type: DataTypes.TEXT, allowNull: false },
    is_approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_checked: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_date",
    updatedAt: "updated_date",
  }
);

module.exports = Topic;
