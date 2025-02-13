const {
  getAnalytics,
  getReportedAds,
  getAllUsers,
  blockUser,
  getBlockedUsers,
} = require("../controllers/admin-controller");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/analytics", authMiddleware, adminOnly, getAnalytics);
router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.get("/reported-ads", authMiddleware, adminOnly, getReportedAds);
router.get("/blocked-users", authMiddleware, adminOnly, getBlockedUsers);
//block and unblock user with email notification
router.patch("/user/:id", authMiddleware, adminOnly, blockUser);

module.exports = router;
