const Dictionary = require("../models/dictionary.model");
const Description = require("../models/description.model");
const { sendErrorResponse } = require("../utils/errorHandler");

const addDescriptionToTerm = async (req, res) => {
  try {
    const { termId } = req.params;
    const { descriptionId } = req.body;

    const term = await Dictionary.findByPk(termId);
    if (!term) return res.status(404).send({ message: "Term not found" });

    const description = await Description.findByPk(descriptionId);
    if (!description) return res.status(404).send({ message: "Description not found" });

    await term.addDescription(description);

    res.status(200).send({ message: "Description successfully linked to Term" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const removeDescriptionFromTerm = async (req, res) => {
  try {
    const { termId, descriptionId } = req.params;

    const term = await Dictionary.findByPk(termId);
    if (!term) return res.status(404).send({ message: "Term not found" });

    const description = await Description.findByPk(descriptionId);
    if (!description) return res.status(404).send({ message: "Description not found" });

    await term.removeDescription(description);

    res.status(200).send({ message: "Description successfully unlinked from Term" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = { addDescriptionToTerm, removeDescriptionFromTerm };
