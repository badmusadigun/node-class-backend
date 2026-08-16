const mongoose = require("mongoose");
const envobj = require("./env");

const connectDb = async () => {
  try {
    const db = await mongoose.connect(envobj.mongodb_url);
    if (db) {
      console.log("Database Connected Successfully");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb