const User = require("../models/user");
const adminRoleCheck = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (user.role === "user") {
      return res
        .status(401)
        .json({ status: false, message: "user not Authorize" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = adminRoleCheck;