const AuthorSocial = require("../models/author_social.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");

const addAuthorSocial = async (req, res) => {
  try {
    const newLink = await AuthorSocial.create(req.body);
    res.status(201).send({ message: "New author-social link added", data: newLink });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const getAuthorSocials = async (req, res) => {
  try {
    const links = await AuthorSocial.findAll();
    res.status(200).send(links);
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const getOneAuthorSocial = async (req, res) => {
  try {
    const { author_id, social_id } = req.params;
    const link = await AuthorSocial.findOne({ where: { author_id, social_id } });
    if (!link) {
      return res.status(404).send({ message: "Author-Social link not found" });
    }
    res.status(200).send(link);
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const updateAuthorSocial = async (req, res) => {
  try {
    const { author_id, social_id } = req.params;
    const [rows, [updatedLink]] = await AuthorSocial.update(req.body, {
      where: { author_id, social_id },
      returning: true
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Author-Social link not found" });
    }
    res.status(200).send({ message: "Link updated", data: updatedLink });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const deleteAuthorSocial = async (req, res) => {
  try {
    const { author_id, social_id } = req.params;
    const deleted = await AuthorSocial.destroy({ where: { author_id, social_id } });
    if (!deleted) {
      return res.status(404).send({ message: "Author-Social link not found" });
    }
    res.status(200).send({ message: "Link deleted" });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

module.exports = {
  addAuthorSocial,
  getAuthorSocials,
  getOneAuthorSocial,
  updateAuthorSocial,
  deleteAuthorSocial
};
