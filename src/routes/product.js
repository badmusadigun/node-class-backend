const express = require("express");
const { addProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct, contact } = require("../controllers/product");


const authCheck = require("../middleware/authCheck");
const adminRoleCheck = require("../middleware/adminRoleCheck");
const  upload  = require("../utils/multer");


const route = express.Router();

// Public routes
route.get("/", getAllProduct);
route.get("/:id", getSingleProduct);


// Admin only routes
route.post("/", authCheck, adminRoleCheck, upload.single("image"), addProduct);
route.put("/:id", authCheck, adminRoleCheck, updateProduct);
route.delete("/:id", authCheck, adminRoleCheck, deleteProduct);


module.exports = route;