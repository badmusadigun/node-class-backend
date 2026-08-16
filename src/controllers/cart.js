const Cart = require("../models/cart");
const Product = require("../models/product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // Check if product is already in cart
    const existingCart = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingCart) {
      existingCart.quantity += quantity || 1;

      await existingCart.save();

      return res.json({
        status: true,
        message: "Cart updated",
        cart: existingCart,
      });
    }

    // Create new cart item
    const cart = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity: quantity || 1,
    });

    return res.status(201).json({
      status: true,
      message: "Added to cart",
      cart,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
};