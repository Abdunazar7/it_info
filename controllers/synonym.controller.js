const { Dictionary, Synonym } = require("../models/index.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");

const addSynonym = async (req, res) => {
  try {
    const synonym = await Synonym.create(req.body);
    res.status(201).send({ message: "Synonym created", data: synonym });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const getSynonyms = async (req, res) => {
  try {
    const synonyms = await Synonym.findAll({
      include: [{ model: Dictionary, attributes: ["id", "term"] }],
    });
    res.status(200).send(synonyms);
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const getOneSynonym = async (req, res) => {
  try {
    const synonym = await Synonym.findByPk(req.params.id, {
      include: [{ model: Dictionary, attributes: ["id", "term"] }],
    });
    if (!synonym) return res.status(404).send({ message: "Synonym not found" });
    res.send(synonym);
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const updateSynonym = async (req, res) => {
  try {
    const [rows, [synonym]] = await Synonym.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    if (!rows) return res.status(404).send({ message: "Synonym not found" });
    res.send({ message: "Synonym updated", data: synonym });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const deleteSynonym = async (req, res) => {
  try {
    const rows = await Synonym.destroy({ where: { id: req.params.id } });
    if (!rows) return res.status(404).send({ message: "Synonym not found" });
    res.send({ message: "Synonym deleted" });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

module.exports = {
  addSynonym,
  getSynonyms,
  getOneSynonym,
  updateSynonym,
  deleteSynonym,
};
