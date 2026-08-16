const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/product");
const sendEmail = require("../utils/mailer");

const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, price, category, image } = req.body;
    // const title = req.body.title;
    // console.log(req.body.description);

    if (!title || !description || !price || !category || !req.file) {
      return res.status(400).json({
        status: false,
        message: "All field are Required",
      });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "june-cohort" },
      async (error, result) => {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({ status: false, message: error.message });
        }
        console.log(result);

        const product = {
          ...req.body,
          image: result.secure_url,
          imageId: result.public_id,
        };

        await Product.create(product);
        return res
          .status(201)
          .json({
            status: true,
            message: "Product created Successfully",
            product,
          });
      },
    );

    stream.end(req.file.buffer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};



const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();

    return res.status(201).json({
      status: true,
      message: "Get product Successfully",
      product: product,
      length: product.length,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }

 

    return res.status(200).json({
      status: true,
      message: "Product fetch Successfully",
      // product: productDTO,
      product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body,{
      // returnDocument: "after",
       new: true, 
      runValidators: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }

    return res.status(200).json({
      status: true,
      message: "Product Updated Successfully", product,
      // product: productDTO,
      product,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }

    return res.status(200).json({
      status: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};



module.exports = { addProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct,  };