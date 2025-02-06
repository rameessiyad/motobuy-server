const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/profile/:id", authMiddleware, getUser);
router.patch("/profile/:id", authMiddleware, updateUser);
router.delete("/profile/:id", authMiddleware, deleteUser);

module.exports = router;
