const {
  login,
  logout,
  refreshToken,
  sign_up,
  sign_in,
  sign_out,
  user_refreshTokenn,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

router.post("/admin/login", loginAdmin);
router.post("/admin/logout", logoutAdmin);
router.post("/admin/refresh", refreshTokenAdmin);

router.post("/sign-up", sign_up); 
router.post("/sign-in", sign_in); 
router.post("/sign-out", sign_out);
router.post("/user-refresh", user_refreshTokenn);

module.exports = router;
