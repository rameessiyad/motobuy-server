const User = require("../models/user-model");
const Ads = require("../models/bike-model");
const sendEmail = require("../config/emailConfig");

module.exports = {
  //get analytics
  //GET /api/v1/admin/analytics
  //@access private admin
  getAnalytics: async (req, res, next) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalAds = await Ads.countDocuments();
      const activeAds = await Ads.countDocuments({ status: "active" });
      const inactiveAds = await Ads.countDocuments({ status: "inactive" });

      res.status(201).json({
        success: true,
        data: {
          totalUsers,
          totalAds,
          activeAds,
          inactiveAds,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  //get all users
  //GET /api/v1/admin/users
  //@access private admin
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        message: "All users fetched",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  //get reported ads
  //GET /api/v1/admin/reported-ads
  //@access private admin
  getReportedAds: async (req, res, next) => {
    try {
      const reportedAds = await Ads.find({ status: "reported" }).sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        data: reportedAds,
      });
    } catch (error) {
      next(error);
    }
  },

  //block and unblock user and send email notification
  //PATCH /api/v1/admin/user/:id
  //@access private admin
  blockUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) return next({ statusCode: 404, message: "User not found" });

      const isBlocked = !user.isBlocked;

      await User.findByIdAndUpdate(req.params.id, { isBlocked }, { new: true });

      //send email notification
      const subject = isBlocked
        ? "Account Blocked Notification"
        : "Account Unblocked Notification";

      const message = isBlocked
        ? `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #ffc107;">Hello ${user.name},</h2>
              <p>Your account has been <strong style="color: #ffc107;">blocked</strong> by the admin.</p>
              <p style="color: #555;">If you have any questions, please contact support.</p>
              <br>
              <p>Regards,</p>
              <p style="font-style: italic; color: #777;">Support Team</p>
            </body>
          </html>`
        : `
          <html>
            <body style="font-family: Arial, sans-serif; color: #333;">
              <h2 style="color: #28a745;">Hello ${user.name},</h2>
              <p>Your account has been <strong style="color: #28a745;">unblocked</strong>.</p>
              <p style="color: #555;">You can now access your account again.</p>
              <br>
              <p>Regards,</p>
              <p style="font-style: italic; color: #777;">Support Team</p>
            </body>
          </html>`;

      await sendEmail(user.email, subject, message);

      res.status(201).json({
        success: true,
        message: isBlocked
          ? "User blocked successfully"
          : "User unblocked successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  //get blocked users
  //GET /api/v1/admin/blocked-users
  //@access private admin
  getBlockedUsers: async (req, res, next) => {
    try {
      const blockedUsers = await User.find({ isBlocked: true }).sort({
        createdAt: -1,
      });

      if (!blockedUser)
        return next({ statusCode: 404, message: "No blocked users found" });

      res.status(201).json({
        success: true,
        data: blockedUsers,
      });
    } catch (error) {
      next(error);
    }
  },
};
