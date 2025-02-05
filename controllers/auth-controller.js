const generateToken = require("../config/generateToken");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

module.exports = {
  //@desc Register a new user
  //@route POST /api/v1/auth/register
  //@access Public
  register: async (req, res, next) => {
    try {
      const { username, email, phoneNumber, password, location } = req.body;
      const userExists = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });

      if (userExists)
        return next({ statusCode: 400, message: "User already exists" });

      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        phoneNumber,
        password: hashedPassword,
        location,
      });

      res.status(201).json({
        success: true,
        data: user,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  //@desc Login user
  //@route POST /api/v1/auth/login
  //@access Public
  login: async (req, res, next) => {
    try {
      const { emailOrPhone, password } = req.body;
      const user = await User.findOne({
        $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
      });

      if (!user) {
        return next({ statusCode: 400, message: "Invalid credentials" });
      }

      //compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return next({
          statusCode: 400,
          message: "check your password and try again",
        });
      } else {
        //generate token
        const token = generateToken(user._id);

        res.status(200).json({
          success: true,
          data: user,
          token,
          message: "User logged in successfully",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
