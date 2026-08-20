const express = require("express");
const envobj = require("./config/env");
const morgan = require("morgan");
const  connectDb  = require("./config/db");
const cors = require("cors");

// const dotenv =  require("dotenv")

// dotenv.config()

const app = express();
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cart")
const { testNodeMailer } = require("./utils/mailer");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin:"https://react-class-frontend-henna.vercel.app",
  credentials: true,
}));
app.use("/api/v1/cart", cartRoute);


const port = envobj.port;

const product = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    rating: {
      rate: 2.1,
      count: 430,
    },
  },
];


const appv = "api/v1";
// welcoming
app.get("/", (req, res) => {
  res.send("Hello, welcome to june node server");
});

// for all product
app.use(`/${appv}/product`, productRoute);
// app.get("/product", (req, res) => {
//   res.send(product);
// });

// get product by id: /product/3

// add  product

// app.post("/product", (req, res) => {
//   // product.push(req.body);

//   console.log(req.body);
//   console.log(req.params);

//   console.log("product");

//   res.status(201).json({ message: "product created succefully", product });
// });

//user service routes
app.use(`/${appv}/auth`, userRoute);

app.use((req, res) => {
  return res.status(400).json({ status: false, message: "route not found" });
});

testNodeMailer();

connectDb();
app.listen(port, () => {
  console.log(`june node is running on port ${port}`);
});