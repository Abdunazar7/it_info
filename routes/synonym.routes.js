const router = require("express").Router();
const {
  addSynonym,
  getSynonyms,
  getOneSynonym,
  updateSynonym,
  deleteSynonym,
} = require("../controllers/synonym.controller");

router.post("/", addSynonym);
router.get("/", getSynonyms);
router.get("/:id", getOneSynonym);
router.put("/:id", updateSynonym);
router.delete("/:id", deleteSynonym);

module.exports = router;
