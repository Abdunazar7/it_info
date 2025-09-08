const router = require("express").Router();
const {
  addTopic,
  getTopics,
  getOneTopic,
  updateTopic,
  deleteTopic,
  addTopicToCategory,
  removeTopicFromCategory,
} = require("../controllers/topic.controller");

router.post("/", addTopic);
router.get("/", getTopics);
router.get("/:id", getOneTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

router.post("/add_topic_to_category", addTopicToCategory);
router.post("/remove_topic_from_category", removeTopicFromCategory);

module.exports = router;
