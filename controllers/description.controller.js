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

const addDescriptionToTerm = async (req, res) => {
  try {
    const { termId, descriptionId } = req.body;

    if(!termId || !descriptionId){
      return res.status(400).send({ message: "termId and descriptionId are required" });
    }

    const term = await Dictionary.findByPk(termId);
    if (!term) {
      return res.status(404).send({ message: "Term not found" });
    }

    const description = await Description.findByPk(descriptionId);
    if (!description) {
      return res.status(404).send({ message: "Description not found" });
    }

    await term.addDescription(description);

    res
      .status(200)
      .send({ message: "Description successfully linked to the term" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const removeDescriptionFromTerm = async (req, res) => {
  try {
    const { termId, descriptionId } = req.body;

    if(!termId || !descriptionId){
      return res.status(400).send({ message: "termId and descriptionId are required" });
    }

    const term = await Dictionary.findByPk(termId);
    if (!term) {
      return res.status(404).send({ message: "Term not found" });
    }

    const description = await Description.findByPk(descriptionId);
    if (!description) {
      return res.status(404).send({ message: "Description not found" });
    }

    await term.removeDescription(description);

    res
      .status(200)
      .send({ message: "Description successfully unlinked from the term" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const addDescriptionToTopic = async (req, res) => {
  try {
    const { descriptionId, topicId } = req.body;

    if(!descriptionId || !topicId){
      return res.status(400).send({ message: "descriptionId and topicId are required" });
    }

    const description = await Description.findByPk(descriptionId);
    if (!description) return res.status(404).send({ message: "Description not found" });

    const topic = await Topic.findByPk(topicId);
    if (!topic) return res.status(404).send({ message: "Topic not found" });

    await description.addTopic(topic);

    res.status(200).send({ message: "Topic successfully linked to Description" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const removeDescriptionFromTopic = async (req, res) => {
  try {
    const { descriptionId, topicId } = req.body;

    if(!descriptionId || !topicId){
      return res.status(400).send({ message: "descriptionId and topicId are required" });
    }

    const description = await Description.findByPk(descriptionId);
    if (!description) return res.status(404).send({ message: "Description not found" });

    const topic = await Topic.findByPk(topicId);
    if (!topic) return res.status(404).send({ message: "Topic not found" });

    await description.removeTopic(topic);

    res.status(200).send({ message: "Topic successfully unlinked from Description" });
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
  addDescriptionToTopic,
  removeDescriptionFromTopic,
  addDescriptionToTerm,
  removeDescriptionFromTerm,
};
