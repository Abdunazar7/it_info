const router = require("express").Router();
const {
  addDescription,
  getDescriptions,
  getOneDescription,
  updateDescription,
  deleteDescription,
  addDescriptionToTopic,
  removeDescriptionFromTopic,
  addDescriptionToTerm,
  removeDescriptionFromTerm,
} = require("../controllers/description.controller");

router.post("/", addDescription);
router.get("/", getDescriptions);
router.get("/:id", getOneDescription);
router.put("/:id", updateDescription);
router.delete("/:id", deleteDescription);

router.post("/desc_for_term", addDescriptionToTerm);
router.post("/remove_desc_from_term",removeDescriptionFromTerm);

router.post("/desc_for_topic", addDescriptionToTopic);
router.post("/remove_desc_from_topic", removeDescriptionFromTopic);

module.exports = router;
