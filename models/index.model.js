const Author = require("./author.model");
const Social = require("./social.model");
const AuthorSocial = require("./author_social.model");

const Category = require("./category.model");
const Description = require("./description.model");
const Dictionary = require("./dictionary.model");
const Tag = require("./tag.model");
const Topic = require("./topic.model");
const DescTopic = require("./desc_topic.model");
const Synonym = require("./synonym.model");

// ================= Associations =================

// Author <-> Social (many-to-many)
Author.belongsToMany(Social, { through: AuthorSocial, foreignKey: "author_id" });
Social.belongsToMany(Author, { through: AuthorSocial, foreignKey: "social_id" });

// Author <-> Topic (one-to-many)
Author.hasMany(Topic);
Topic.belongsTo(Author);

// Category <-> Description (one-to-many)
Category.hasMany(Description);
Description.belongsTo(Category);

// Category <-> Tag (one-to-many)
Category.hasMany(Tag);
Tag.belongsTo(Category);

// Category <-> Category (self relation)
Category.hasMany(Category, { foreignKey: "parent_category_id", as: "children" });
Category.belongsTo(Category, { foreignKey: "parent_category_id", as: "parent" });

// Topic <-> Tag (one-to-many)
Topic.hasMany(Tag);
Tag.belongsTo(Topic);

// Description <-> Topic (many-to-many)
Description.belongsToMany(Topic, { through: DescTopic });
Topic.belongsToMany(Description, { through: DescTopic });

// Dictionary <-> Description (many-to-many)
Dictionary.belongsToMany(Description, { through: Synonym });
Description.belongsToMany(Dictionary, { through: Synonym });

module.exports = {
  Author,
  Social,
  AuthorSocial,
  Category,
  Description,
  Dictionary,
  Tag,
  Topic,
  DescTopic,
  Synonym,
};
