const {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

const authGuard = require("../middlewares/guards/auth.guard");
const iscreatorGuard = require("../middlewares/guards/iscreator.guard");

const router = require("express").Router();

router.post("/", authGuard, iscreatorGuard, addAdmin);
router.get("/", getAdmins);
router.get("/:id", authGuard, getOneAdmin);
router.put("/:id", authGuard, updateAdmin);
router.delete("/:id", authGuard, deleteAdmin);

module.exports = router;
