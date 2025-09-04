const {
  addAuthor,
  getAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const selfGuard = require("../middlewares/guards/self.guard");

const router = require("express").Router();

router.post("/", authGuard, addAuthor);
router.get("/", authGuard, getAuthors);
router.get("/:id", authGuard, selfGuard, getOneAuthor);
router.put("/:id", authGuard, selfGuard, updateAuthor);
router.delete("/:id", authGuard, selfGuard, deleteAuthor);

module.exports = router;
