const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

module.exports = {
  authMiddleware: async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return next({
          statusCode: 401,
          message: "Unauthorized, no token provided",
        });
      }

      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return next({
          statusCode: 401,
          messag: "Unauthorized, no token provided",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      next(error);
    }
  },

  adminMiddleware: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return next({
            statusCode: 401,
            message: "Unauthorized, invalid token",
          });
        }

        if (decoded.role !== "admin") {
          return next({
            statusCode: 403,
            message: "Unauthorized, only admin can access this route",
          });
        }

        next();
      });
    } catch (error) {
      next(error);
    }
  },
};
