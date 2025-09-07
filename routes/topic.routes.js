const router = require("express").Router();
const {
  addTopic,
  getTopics,
  getOneTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic.controller");

router.post("/", addTopic);
router.get("/", getTopics);
router.get("/:id", getOneTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
