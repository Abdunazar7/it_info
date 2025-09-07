const {
  Category,
  Description,
  Dictionary,
  Topic,
} = require("../models/index.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");

const addDescription = async (req, res) => {
  try {
    if (!req.body.category_id) {
      return sendErrorResponse(
        { message: "category_id is required" },
        res,
        400
      );
    }
    const newDescription = await Description.create(req.body);
    res
      .status(201)
      .send({ message: "New description added", data: newDescription });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const getDescriptions = async (req, res) => {
  try {
    const descriptions = await Description.findAll({
      include: {
        model: Category,
        attributes: ["id", "category_name"],
      },
      order: [["id", "DESC"]],
    });
    res.status(200).send(descriptions);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const description = await Description.findByPk(id, {
      include: [
        Category,
        {
          model: Topic,
          attributes: ["id", "topic_title"],
          through: { attributes: [] },
        },
        {
          model: Dictionary,
          attributes: ["id", "term"],
          through: { attributes: [] },
        },
      ],
    });
    if (!description) {
      return res.status(404).send({ message: "Description not found" });
    }
    res.status(200).send(description);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedDescription]] = await Description.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Description not found" });
    }
    res
      .status(200)
      .send({ message: "Description updated", data: updatedDescription });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Description.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Description not found" });
    }
    res.status(200).send({ message: "Description deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  addDescription,
  getDescriptions,
  getOneDescription,
  updateDescription,
  deleteDescription,
};
