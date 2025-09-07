const {
  addSocial,
  getSocials,
  getOneSocial,
  updateSocial,
  deleteSocial,
} = require("../controllers/social.controller");

const router = require("express").Router();

router.post("/", addSocial);
router.get("/", getSocials);
router.get("/:id", getOneSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
