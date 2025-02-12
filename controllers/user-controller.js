const User = require("../models/user-model");
const { getFileUrl } = require("../utils/image-upload");

module.exports = {
  //@desc get user profile by id
  //@route GET /api/v1/user/profile/:id
  //@access private
  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) return next({ statusCode: 404, message: "User not found" });
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  },

  //@desc updatee user profile by id
  //@route PATCH /api/v1/user/profile/:id
  //@access private
  updateUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return next({ statusCode: 404, message: "User not found" });

      //image url generation
      const imageUrl = req.file ? getFileUrl(req, req.file) : null;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          username: req.body.username || user.username,
          email: req.body.email || user.email,
          phoneNumber: req.body.phoneNumber || user.phoneNumber,
          district: req.body.district || user.district,
          state: req.body.state || user.state,
          city: req.body.city || user.city,
          profilePicture: imageUrl || user.profilePicture,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "profile updated successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Error updating profile" });
    }
  },

  //@desc delete user profile by id
  //@route DELETE /api/v1/user/profile/:id
  //@access private
  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user" });
    }
  },
};
