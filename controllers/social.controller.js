const Social = require("../models/social.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");

const addSocial = async (req, res) => {
  try {
    const newSocial = await Social.create(req.body);
    res.status(201).send({ message: "New social added", data: newSocial });
  } catch (err) {
    sendErrorResponse(err, res, 400);
  }
};

const getSocials = async (req, res) => {
  try {
    const socials = await Social.findAll();
    res.status(200).send(socials);
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const getOneSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await Social.findByPk(id);
    if (!social) {
      return res.status(404).send({ message: "Social not found" });
    }
    res.status(200).send(social);
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const updateSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedSocial]] = await Social.update(req.body, {
      where: { id },
      returning: true
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Social not found" });
    }
    res.status(200).send({ message: "Social updated", data: updatedSocial });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const deleteSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Social.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Social not found" });
    }
    res.status(200).send({ message: "Social deleted" });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

module.exports = {
  addSocial,
  getSocials,
  getOneSocial,
  updateSocial,
  deleteSocial
};
