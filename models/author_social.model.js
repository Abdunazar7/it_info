const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Author = require("./author.model");
const Social = require("./social.model");

const AuthorSocial = sequelize.define("author_social", {
  author_id: { type: DataTypes.INTEGER, primaryKey: true },
  social_id: { type: DataTypes.INTEGER, primaryKey: true },
  social_link: { type: DataTypes.STRING }
}, { freezeTableName: true, timestamps: true });

Author.belongsToMany(Social, { through: AuthorSocial, foreignKey: "author_id" });
Social.belongsToMany(Author, { through: AuthorSocial, foreignKey: "social_id" });

module.exports = AuthorSocial;
