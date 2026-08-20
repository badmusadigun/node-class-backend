const nodeMailer = require("nodemailer");
const envobj = require("../config/env");
const transporter = nodeMailer.createTransport({
   host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: envobj.gmailAddress,
    pass: envobj.gmailAppPassword,
  },
});

const testNodeMailer = async () => {
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (err) {
    console.error("Verification failed:", err);
  }
};

const sendMail = async (email, subject, body) => {
  try {
    const info = await transporter.sendMail({
      from: envobj.gmailAddress,
      to: email,
      subject: subject,
      html: body,
    });
  } catch (error) {
    console.log("error while sending mail", error);
  }
};

module.exports = { testNodeMailer, sendMail };