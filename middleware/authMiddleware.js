const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

module.exports = {
  authMiddleware: async (req, res, next) => {
    let token;

    //check if token is in the headers
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else {
      return next({
        statusCode: 401,
        message: "Unauthorized, no token found",
      });
    }

    try {
      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId);

      if (!req.user) {
        return next({
          statusCode: 401,
          message: "Unauthorized, user not found",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  },

  adminOnly: (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      next({ statusCode: 403, message: "Forbidden, you are not an admin" });
    }
  },
};
