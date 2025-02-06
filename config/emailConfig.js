const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html: htmlContent
    });
    console.log("Email send successfully");
  } catch (error) {
    console.log("Error sending email: ", error);
  }
};

module.exports = sendEmail;
