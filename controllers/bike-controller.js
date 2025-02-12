const { addAbortSignal } = require("nodemailer/lib/xoauth2");
const Bike = require("../models/bike-model");
const { getFileUrl } = require("../utils/image-upload");

module.exports = {
  //post an ad
  //POST /api/v1/bike
  // @access Private
  postAd: async (req, res, next) => {
    try {
      const {
        title,
        description,
        price,
        brand,
        category,
        year,
        kilometers,
        state,
        district,
        city,
        ownership,
      } = req.body;

      //images
      const images =
        req.files && req.files.map((file) => getFileUrl(req, file));

      const ad = await Bike.create({
        title,
        description,
        price,
        brand,
        category,
        year,
        kilometers,
        state,
        district,
        city,
        ownership,
        images,
      });

      res.status(201).json({
        success: true,
        message: "your ad posted successfully",
        data: ad,
      });
    } catch (error) {
      next(error);
    }
  },

  //get all ads
  //GET /api/v1/bike
  // @access Public
  getAds: async (req, res, next) => {
    try {
      const ads = await Bike.find();
      res.status(200).json({
        success: true,
        message: "Ads fetched successfully",
        data: addAbortSignal,
      });
    } catch (error) {
      next(error);
    }
  },

  //get ad by id
  //GET /api/v1/bike/:id
  //@access public
  getAd: async (req, res, next) => {
    try {
      const ad = await Bike.findById(req.params.id);
      if (!ad) {
        return next({ statusCode: 404, message: "Bike not found" });
      }

      res.status(201).json({
        success: true,
        message: "Ad found",
        data: ad,
      });
    } catch (error) {
      next(error);
    }
  },

  //edit ad details
  //PATCH /api/v1/bike/:id
  //@access private
  editAd: async (req, res, next) => {
    try {
      const ad = await Bike.findById(req.params.id);
      if (!ad) return next({ statusCode: 404, messsage: "Bike not found" });

      const images =
        req.files && req.files.map((file) => getFileUrl(req, file));

      const updatedAd = await Bike.findByIdAndUpdate(req.paramsid, {
        title: req.body.title || bike.title,
        description: req.body.description || bike.description,
        price: req.body.price || bike.price,
        brand: req.body.brand || bike.brand,
        category: req.body.category || bike.category,
        year: req.body.year || bike.year,
        kilometers: req.body.kilometers || bike.kilometers,
        state: req.body.state || bike.state,
        district: req.body.district || bike.district,
        city: req.body.city || bike.city,
        ownership: req.body.ownership || bike.ownership,
        images: images || bike.images,
      });

      res.status(201).json({
        success: true,
        message: "Ad details updated successfully",
        data: updatedAd,
      });
    } catch (error) {
      next(error);
    }
  },

  //delete an ad
  //DELETE /api/v1/bike/:id
  //@access private
  deleteAd: async (req, res, next) => {
    try {
      const ad = await Bike.findById(req.params.id);
      if (!ad) return next({ statusCode: 404, message: "Ad not found" });

      await Bike.findByIdAndDelete(req.params.id);
      res.status(201).json({
        success: true,
        message: "Your ad deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
