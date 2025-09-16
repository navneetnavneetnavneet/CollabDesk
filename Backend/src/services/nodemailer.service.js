const config = require("../config/config");
const nodemailer = require("nodemailer");

module.exports.sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: config.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email sending error : ", error);
  }
};
