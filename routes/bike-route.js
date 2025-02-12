const {
  getAds,
  getAd,
  postAd,
  editAd,
  deleteAd,
} = require("../controllers/bike-controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload } = require("../utils/image-upload");

const router = require("express").Router();

router.get("/", getAds);
router.get("/:id", getAd);
router.post("/", authMiddleware, upload.array("images", 5), postAd);
router.patch("/:id", authMiddleware, upload.array("images", 5), editAd);
router.delete("/:id", authMiddleware, deleteAd);

module.exports = router;
