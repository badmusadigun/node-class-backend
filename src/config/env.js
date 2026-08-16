const dotenv = require("dotenv").config();

const envobj = {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
    saltRound: process.env.SALT_ROUND,
  jwtSecret: process.env.JWT_SECRET,
  expireIn: process.env.JWT_EXPIREIN,
      cloudinaryCloudName: process.env.CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinarySecretKey: process.env.CLOUDINARY_API_SECRET,
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
  gmailAddress: process.env.GMAIL_ADDRESS
};

module.exports = envobj;