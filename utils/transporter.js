const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""
  }
});

const emailVerification = async (req, res) => {
  const { email, username } = req.body;

  try {
    await transporter.sendMail({
      from: "NDC",
      to: email,
      subject: "Email Verification",
      html: `Hello ${username}, to verify your email, please click ${url}`
    });

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

module.exports = { emailVerification };
