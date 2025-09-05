const Author = require("../models/author.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");
const bcrypt = require("bcrypt");

const addAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await Author.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Author already exists" }, res, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newAuthor = await Author.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).send({ message: "New author added", data: newAuthor });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).send(authors);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).send({ message: "Author not found" });
    }
    res.status(200).send(author);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedAuthor]] = await Author.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Author not found" });
    }
    res.status(200).send({ message: "Author updated", data: updatedAuthor });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Author.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Author not found" });
    }
    res.status(200).send({ message: "Author deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  addAuthor,
  getAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
};
