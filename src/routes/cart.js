const express = require("express");

const route = express.Router();

const { addToCart } = require("../controllers/cart");

const authCheck = require("../middleware/authCheck");

route.post("/", authCheck, addToCart);

module.exports = route;