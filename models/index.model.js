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
Author.hasMany(Topic, { foreignKey: "author_id" });
Topic.belongsTo(Author, { foreignKey: "author_id" });

// Category <-> Description (one-to-many)
Category.hasMany(Description, { foreignKey: "category_id" });
Description.belongsTo(Category, { foreignKey: "category_id" });

// Category <-> Tag (one-to-many)
Category.hasMany(Tag, { foreignKey: "category_id" });
Tag.belongsTo(Category, { foreignKey: "category_id" });

// Category <-> Category (self relation)
Category.hasMany(Category, { foreignKey: "parent_category_id", as: "children" });
Category.belongsTo(Category, { foreignKey: "parent_category_id", as: "parent" });

// Topic <-> Tag (one-to-many)
Topic.hasMany(Tag, { foreignKey: "topic_id" });
Tag.belongsTo(Topic, { foreignKey: "topic_id" });

// Category <-> Topic (many-to-many through Tag)
Category.belongsToMany(Topic, { through: Tag, foreignKey: "category_id", otherKey: "topic_id" });
Topic.belongsToMany(Category, { through: Tag, foreignKey: "topic_id", otherKey: "category_id" });

// Description <-> Topic (many-to-many)
Topic.belongsToMany(Description, {
  through: DescTopic,
  foreignKey: "topic_id",
  as: "descriptions"
});

Description.belongsToMany(Topic, {
  through: DescTopic,
  foreignKey: "description_id",
  as: "topics"
});

// Dictionary <-> Description (many-to-many)
Dictionary.belongsToMany(Description, { through: Synonym, foreignKey: "dictionary_id" });
Description.belongsToMany(Dictionary, { through: Synonym, foreignKey: "description_id" });

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
