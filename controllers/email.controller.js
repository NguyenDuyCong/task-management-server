const nodemailer = require("nodemailer");
const crypto = require("crypto");

const { appConfig, emailConfig } = require("../config/config");
const User = require("../models/user.model");
const { json } = require("express/lib/response");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${emailConfig.EMAIL_USER}`,
    pass: `${emailConfig.EMAIL_PASS}`
  }
});

const sendEmail = async (username, email, verifyCode) => {
  let verifyUrl = `${appConfig.APP_URL}/api/email/confirm/${verifyCode}`;
  try {
    await transporter.sendMail({
      from: `${emailConfig.EMAIL_USER}`,
      to: email,
      subject: "Email Verification",
      html: `Hello ${username}, to verify your email, please click the link below ${verifyUrl}`
    });
    console.log("email was sent!");
  } catch (error) {
    console.error(error);
  }
};

// request to generate new verifyCode
const genNewEmailVerification = async (req, res) => {
  const { email, username } = req.body;

  const verifyCodeString = `${email}${new Date().getTime()}`;
  const verifyCode = crypto
    .createHash("md5")
    .update(verifyCodeString)
    .digest("hex");

  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      res.status(400).json({
        success: false,
        message: "user does not exist"
      });
    }

    await User.findByIdAndUpdate(user._id, { verifyCode });

    await sendEmail(username, email, verifyCode);

    return res.json({
      success: true,
      message: "please check your email!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "internal server error!"
    });
  }
};

// verify email
const verifyEmail = async (req, res) => {
  let hash = req.params.hash;

  try {
    let user = await User.findOne({ verifyCode: hash }).select("-password");

    if (!user) {
      res.status(400).json({
        success: false,
        message: "user does not exist"
      });
    }

    // console.log(user);

    await User.findByIdAndUpdate(user._id, {
      $unset: { verifyCode: "" },
      isVerify: true
    });

    res.json({
      success: true,
      message: "email is verified"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error!"
    });
  }
};

module.exports = { genNewEmailVerification, sendEmail, verifyEmail };
