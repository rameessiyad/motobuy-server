const {
  getAnalytics,
  getReportedAds,
} = require("../controllers/admin-controller");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.get("/analytics", authMiddleware, adminOnly, getAnalytics);
router.get("/reported-ads", authMiddleware, adminOnly, getReportedAds);

module.exports = router;
