const {
  getAnalytics,
  getReportedAds,
  getAllUsers,
} = require("../controllers/admin-controller");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/analytics", authMiddleware, adminOnly, getAnalytics);
router.get("/users", authMiddleware, adminOnly, getAllUsers);
router.get("/reported-ads", authMiddleware, adminOnly, getReportedAds);

module.exports = router;
