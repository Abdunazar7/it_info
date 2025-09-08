const router = require("express").Router();

const authRouter = require("./auth.routes");
const authorRouter = require("./author.routes");
const userRouter = require("./user.routes");
const adminRouter = require("./admin.routes");
const socialRouter = require("./social.routes");
const dictionaryRouter = require("./dictionary.routes");
const descriptionRouter = require("./description.routes");
const categoryRouter = require("./category.routes");
const topicRouter = require("./topic.routes");

router.use("/auth", authRouter);
router.use("/authors", authorRouter);
router.use("/users", userRouter);
router.use("/admins", adminRouter);
router.use("/socials", socialRouter);
router.use("/dictionaries", dictionaryRouter);
router.use("/descriptions", descriptionRouter);
router.use("/categories", categoryRouter);
router.use("/topics", topicRouter);

module.exports = router;