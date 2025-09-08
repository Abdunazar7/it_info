const router = require("express").Router();
const {
  addTerm,
  getTerms,
  getOneTerm,
  updateTerm,
  deleteTerm,
} = require("../controllers/dictionary.controller");

router.post("/", addTerm);
router.get("/", getTerms);
router.get("/:id", getOneTerm);
router.put("/:id", updateTerm);
router.delete("/:id", deleteTerm);

module.exports = router;
