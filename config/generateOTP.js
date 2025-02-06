const randomString = require("randomstring");

const generateOTP = randomString.generate({
  length: 6,
  charset: "numeric",
});

module.exports = generateOTP;
