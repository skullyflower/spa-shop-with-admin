const express = require("express");
const fs = require("fs");
const shopfilepath = "../spa-shop/public/data/sale.json";

function routes() {
  const saleRouter = express.Router();
  saleRouter
    .route("/sale")
    .post((req, res) => {
      if (!isNaN(Number(req.body.values.sale))) {
        try {
          const oldShopDataString = fs.readFileSync(shopfilepath);
          const oldShopObject = JSON.parse(oldShopDataString);
          const newShopData = { ...oldShopObject, sale: Number(req.body.values.sale) };
          fs.writeFileSync(shopfilepath, JSON.stringify(newShopData));
          return res.json({ message: "Updated Sale!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Sale update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    })
    .get((req, res) => {
      const shopData = fs.readFileSync(shopfilepath);
      const shop = JSON.parse(shopData);
      return res.json({ sale: shop.sale });
    });
  return saleRouter;
}
module.exports = routes;
