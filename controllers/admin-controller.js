const User = require("../models/user-model");
const Ads = require("../models/bike-model");

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
};
