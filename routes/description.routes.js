const router = require("express").Router();
const {
  addDescription,
  getDescriptions,
  getOneDescription,
  updateDescription,
  deleteDescription,
} = require("../controllers/description.controller");

router.post("/", addDescription);
router.get("/", getDescriptions);
router.get("/:id", getOneDescription);
router.put("/:id", updateDescription);
router.delete("/:id", deleteDescription);

module.exports = router;
