const router = require("express").Router();

const authorRouter = require("./author.routes");
const socialRouter = require("./social.routes");
const authorSocialRouter = require("./author_social.routes");
const authRouter = require("./auth.routes")

router.use("/auth", authRouter)
router.use("/authors", authorRouter);
router.use("/socials", socialRouter);
router.use("/author-socials", authorSocialRouter);

module.exports = router;
