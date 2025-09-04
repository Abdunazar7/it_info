const {
  addAuthorSocial,
  getAuthorSocials,
  getOneAuthorSocial,
  updateAuthorSocial,
  deleteAuthorSocial
} = require("../controllers/author_social.controller");

const router = require("express").Router();

router.post("/", addAuthorSocial);
router.get("/", getAuthorSocials);
router.get("/:author_id/:social_id", getOneAuthorSocial);
router.put("/:author_id/:social_id", updateAuthorSocial);
router.delete("/:author_id/:social_id", deleteAuthorSocial);

module.exports = router;
