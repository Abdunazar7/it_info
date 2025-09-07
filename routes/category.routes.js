const router = require("express").Router();
const {
  addCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.post("/", addCategory);
router.get("/", getCategories);
router.get("/:id", getOneCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
