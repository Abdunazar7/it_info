const router = require("express").Router();
const {
  addTerm,
  getTerms,
  getOneTerm,
  updateTerm,
  deleteTerm,
  addDescriptionToTerm,
  removeDescriptionFromTerm,
} = require("../controllers/dictionary.controller");

router.post("/", addTerm);
router.get("/", getTerms);
router.get("/:id", getOneTerm);
router.put("/:id", updateTerm);
router.delete("/:id", deleteTerm);

router.post("/:termId/descriptions", addDescriptionToTerm);
router.delete(
  "/:termId/descriptions/:descriptionId",
  removeDescriptionFromTerm
);

module.exports = router;
