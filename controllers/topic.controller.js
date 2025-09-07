const { Author, Description, Tag, Topic } = require("../models/index.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");

const addTopic = async (req, res) => {
  try {
    const newTopic = await Topic.create({ ...req.body });
    res.status(201).send({ message: "New topic added", data: newTopic });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const getTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll({
      include: [
        {
          model: Author,
          attributes: ["id", "first_name", "last_name"],
        },
        Tag,
      ],
      order: [["created_date", "DESC"]],
    });
    res.status(200).send(topics);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findByPk(id, {
      include: [Author, Tag, Description],
    });
    if (!topic) {
      return res.status(404).send({ message: "Topic not found" });
    }
    res.status(200).send(topic);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedTopic]] = await Topic.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Topic not found" });
    }
    res.status(200).send({ message: "Topic updated", data: updatedTopic });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Topic.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Topic not found" });
    }
    res.status(200).send({ message: "Topic deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  addTopic,
  getTopics,
  getOneTopic,
  updateTopic,
  deleteTopic,
};
