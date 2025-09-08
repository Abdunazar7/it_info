const { Category, Description, Dictionary } = require("../models/index.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");

const addTerm = async (req, res) => {
  try {
    const { term } = req.body;
    const candidate = await Dictionary.findOne({ where: { term } });
    if (candidate) {
      return sendErrorResponse(
        { message: "This term already exists in the dictionary" },
        res,
        400
      );
    }
    const newTerm = await Dictionary.create(req.body);
    res
      .status(201)
      .send({ message: "New term added to dictionary", data: newTerm });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const getTerms = async (req, res) => {
  try {
    const terms = await Dictionary.findAll({ order: [["term", "ASC"]] });
    res.status(200).send(terms);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const term = await Dictionary.findByPk(id, {
      include: [
        {
          model: Description,
          include: {
            model: Category,
            attributes: ["id", "category_name"],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!term) {
      return res.status(404).send({ message: "Term not found" });
    }
    res.status(200).send(term);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedTerm]] = await Dictionary.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Term not found" });
    }
    res.status(200).send({ message: "Term updated", data: updatedTerm });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Dictionary.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Term not found" });
    }
    res.status(200).send({ message: "Term deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  addTerm,
  getTerms,
  getOneTerm,
  updateTerm,
  deleteTerm,
};
