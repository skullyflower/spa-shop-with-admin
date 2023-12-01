const express = require("express");
const fs = require("fs");
const shopfilepath = "../spa-shop/public/data/products.json";
const processFile = require("./imageProcessor");
const storeUploads = require("./filestore.js");

const upload = storeUploads();

function routes() {
  const productsRouter = express.Router();
  productsRouter
    .route("/products")
    .post(upload.array("newImage", 1), async (req, res, next) => {
      if (req.body.product) {
        try {
          const product = JSON.parse(req.body.product);
          const categoryId = product.cat[0];
          const bigDestPath = `../spa-shop/public/shop/${categoryId}/`;
          const smallDestPath = `../spa-shop/public/shop/smaller/${categoryId}/`;

          if (req.files) {
            for (const file of req.files) {
              try {
                processFile(file, bigDestPath, smallDestPath);
                product.img = `${bigDestPath.replace("../spa-shop/public", "")}${file.filename}`;
              } catch (err) {
                console.log("Failed: file upload");
              }
            }
          }
          const oldShopDataString = fs.readFileSync(shopfilepath);
          const oldShopData = JSON.parse(oldShopDataString);
          const productArray = oldShopData.products;
          const prodIndex = productArray.findIndex((prod) => prod.id === product.id);
          if (prodIndex !== -1) {
            productArray[prodIndex] = product;
          } else {
            productArray.unshift(product);
          }

          const newShopData = { products: productArray };

          fs.writeFileSync(shopfilepath, JSON.stringify(newShopData));
          return res.json({ message: "Updated Products!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Products update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    })
    .get((req, res) => {
      const shopData = fs.readFileSync(shopfilepath);
      const shop = JSON.parse(shopData);
      if (shop.products) {
        return res.json(shop.products);
      }
    });
  productsRouter.route("/products/:prodId").delete((req, res) => {
    try {
      const prodToDelete = req.params.prodId;
      const shopData = fs.readFileSync(shopfilepath);
      const shop = JSON.parse(shopData);
      const allproducts = shop.products;
      const indexToDelete = allproducts.findIndex((prod) => prod.id === prodToDelete);
      if (indexToDelete !== -1) {
        allproducts.splice(indexToDelete, 1);
        const newShopObj = { ...shop, products: allproducts };
        const newShopData = JSON.stringify(newShopObj);
        fs.writeFileSync(shopfilepath, newShopData);
        return res.json({ message: `Successfully deleted ${prodToDelete}` });
      }
      res.json({ message: `Couldn't find ${req.params.prodId} in the list.` });
    } catch (err) {
      console.log(err);
      res.json({ message: `Failed to delete ${req.params.prodId}` });
    }
  });
  return productsRouter;
}
module.exports = routes;
