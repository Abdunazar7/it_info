const { Category, Description, Tag } = require("../models/index.model");
const { sendErrorResponse } = require("../helpers/send.response.errors");

const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const candidate = await Category.findOne({ where: { category_name } });
    if (candidate) {
      return sendErrorResponse(
        { message: "Category already exists" },
        res,
        400
      );
    }

    const newCategory = await Category.create(req.body);
    res.status(201).send({ message: "New category added", data: newCategory });
  } catch (err) {
    sendErrorResponse(err, res, 500);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        { model: Category, as: "children" },
        { model: Category, as: "parent" },
      ],
    });
    res.status(200).send(categories);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        Description,
        Tag,
        { model: Category, as: "children" },
        { model: Category, as: "parent" },
      ],
    });

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send(category);
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};


const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows, [updatedCategory]] = await Category.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res
      .status(200)
      .send({ message: "Category updated", data: updatedCategory });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.status(200).send({ message: "Category deleted" });
  } catch (error) {
    sendErrorResponse(error, res, 500);
  }
};

module.exports = {
  addCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
