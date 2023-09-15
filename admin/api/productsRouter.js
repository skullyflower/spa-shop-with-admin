const express = require("express");
const fs = require("fs");
const shopfilepath = "../spa-shop/src/pages/shop/product/products.json";

function routes() {
  const productsRouter = express.Router();
  productsRouter
    .route("/products")
    .post((req, res, next) => {
      if (req.body.products) {
        try {
          const oldShopDataString = fs.readFileSync(shopfilepath);
          const oldShopObject = JSON.parse(oldShopDataString);
          const newShopData = { ...oldShopObject, ...req.body }; //{products: products }
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
