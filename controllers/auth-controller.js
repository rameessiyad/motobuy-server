const sendEmail = require("../config/emailConfig");
const generateOTP = require("../config/generateOTP");
const generateToken = require("../config/generateToken");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

let otpStore = {};

module.exports = {
  //@desc Send OTP to user
  //@route POST /api/v1/auth/otp
  //@access Public
  sendOtp: async (req, res, next) => {
    try {
      const { email } = req.body;

      let user = await User.findOne({ email });

      if (user && user.isVerified) {
        return next({ statusCode: 400, message: "User already registered" });
      }

      //generate OTP
      const otp = generateOTP;
      console.log(`Generated OTP is : ${otp}`);

      //store otp for 5 minutes
      otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

      //send otp via email
      await sendEmail(email, "OTP verification", `Your OTP is : ${otp}`);
    } catch (error) {
      next(error);
    }
  },

  //@desc Verify OTP
  //@route POST /api/v1/auth/verify-otp
  //@access Public
  verifyOtp: async (req, res, next) => {
    try {
      const { email, otp } = req.body;

      //check if otp is valid
      if (!otpStore[email] || otpStore[email].expiresAt < Date.now()) {
        return next({ statusCode: 400, message: "OTP expired" });
      }

      //verify otp
      if (otpStore[email].otp !== otp) {
        return next({ statusCode: 400, message: "Incorrect OTP" });
      }

      res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });

      //remove otp from store after verification
      delete otpStore[email];
    } catch (error) {
      next(error);
    }
  },

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
        isVerified: true,
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
