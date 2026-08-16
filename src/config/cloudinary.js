const envobj = require("./env");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: envobj.cloudinaryCloudName,
  api_key: envobj.cloudinaryApiKey,
  api_secret: envobj.cloudinarySecretKey,
});

module.exports = { cloudinary };