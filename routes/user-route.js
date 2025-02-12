const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../utils/image-upload");

const router = require("express").Router();

router.get("/profile/:id", authMiddleware, getUser);
router.patch(
  "/profile/:id",
  authMiddleware,
  upload.single("profilePicture"),
  updateUser
);
router.delete("/profile/:id", authMiddleware, deleteUser);

module.exports = router;
