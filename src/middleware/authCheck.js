const jwt = require("jsonwebtoken");
const envobj = require("../config/env");

const authCheck = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res
        .status(404)
        .json({ status: false, message: "Token not found" });
    }

    const token = bearerToken.slice(7);
    try {
      const decoded = jwt.verify(token, envobj.jwtSecret);
      req.user = decoded;
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: "false", message: error.message });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authCheck;