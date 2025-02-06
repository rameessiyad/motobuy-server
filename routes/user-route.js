const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

const router = require("express").Router();

router.get("/profile/:id", getUser);
router.patch("/profile/:id", updateUser);
router.delete("/profile/:id", deleteUser);

module.exports = router;
