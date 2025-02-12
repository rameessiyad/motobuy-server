const {
  register,
  login,
  sendOtp,
  verifyOtp,
} = require("../controllers/auth-controller");
const { upload } = require("../utils/image-upload");

const router = require("express").Router();

router.post("/otp", sendOtp);
router.post("/verify", verifyOtp);
router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);

module.exports = router;
