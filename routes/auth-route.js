const {
  register,
  login,
  sendOtp,
  verifyOtp,
} = require("../controllers/auth-controller");

const router = require("express").Router();

router.post("/otp", sendOtp);
router.post("/verify", verifyOtp);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
