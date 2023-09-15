const express = require("express");
const fs = require("fs");
const shopfilepath = "../spa-shop/src/pages/shop/categories.json";

function routes() {
  const categoriesRouter = express.Router();
  categoriesRouter
    .route("/categories")
    .post((req, res, next) => {
      if (req.body.categories) {
        try {
          const oldShopDataString = fs.readFileSync(shopfilepath);
          const oldShopObject = JSON.parse(oldShopDataString);
          const newShopData = { ...oldShopObject, ...req.body };
          fs.writeFileSync(shopfilepath, JSON.stringify(newShopData));
          return res.json({ message: "Updated Shop Categories!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Categories update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    })
    .get((req, res) => {
      const shopData = fs.readFileSync(shopfilepath);
      const shop = JSON.parse(shopData);
      if (shop.categories) {
        return res.json(shop.categories);
      }
    });
  // TODO: add check for prods with the category
  categoriesRouter.route("/categories/:catId").delete((req, res) => {
    try {
      const catToDelete = req.params.catId;
      const shopData = fs.readFileSync(shopfilepath);
      const shop = JSON.parse(shopData);
      if (
        shop.categories &&
        shop.categories[shop.categories.findIndex((cat) => cat.id === catToDelete)]
      ) {
        const allcategories = shop.categories;
        var newCategoryData = allcategories.filter((cats) => cats.id !== catToDelete);
        const newShopObj = { ...shop, categories: newCategoryData };
        const newShopData = JSON.stringify(newShopObj);
        fs.writeFileSync(shopfilepath, newShopData);
        return res.json({ message: `Successfully deleted ${catToDelete}` });
      }
      res.json({ message: `Couldn't find ${req.params.catId} in the list.` });
    } catch (err) {
      console.log(err);
      res.json({ message: `Failed to delete ${req.params.catId}` });
    }
  });
  return categoriesRouter;
}
module.exports = routes;
