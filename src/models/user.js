const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [2, "First name must be at least 2 characters long"],
    maxLength: [12, "FirstName must not be Three character long "],
    trim: true,

  },
  lastName: {
    type: String,
    required: true,
    minLength: [2, "FirstName must be Three character long "],
    maxLength: [12, "FirstName must not be Three character long "],
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    minLength: [11],
    maxLength: [11],
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  emailOtp: {
    type: String,
  },

  emailOtpExpires: {
    type: Date,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  },
  {
    timestamps: true,
  
}
)
module.exports = mongoose.model("user", userSchema);