const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AuthorSocial = sequelize.define(
  "author_social",
  {
    author_id: { type: DataTypes.INTEGER, primaryKey: true },
    social_id: { type: DataTypes.INTEGER, primaryKey: true },
    social_link: { type: DataTypes.STRING },
  },
  { freezeTableName: true, timestamps: true }
);

module.exports = AuthorSocial;
