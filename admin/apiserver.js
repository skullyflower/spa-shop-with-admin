const express = require("express");
const aboutRouter = require("./api/aboutRouter")();
const blogRouter = require("./api/blogRouter")();
const categoriesRouter = require("./api/categoriesRouter")();
const homeRouter = require("./api/homeRouter")();
const imagesRouter = require("./api/imagesRouter")();
const productsRouter = require("./api/productsRouter")();
const saleRouter = require("./api/saleRouter")();
const api = express();

api.use(express.urlencoded({ extended: true }));
api.use(express.json());

api.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:3001");
  res.set("Access-Control-Allow-Methods", "POST,PUT,PATCH,DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

api.use(
  "/api",
  aboutRouter,
  blogRouter,
  categoriesRouter,
  homeRouter,
  imagesRouter,
  productsRouter,
  saleRouter,
);

api.get("/", (req, res) => {
  res.send("Welcome to SPA Shop Admin API!");
});

api.listen(4242, () => {
  console.log("Express Server is running...");
});
