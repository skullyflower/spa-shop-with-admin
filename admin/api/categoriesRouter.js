const express = require("express");
const fs = require("fs");
const shopfilepath = "../spa-shop/public/data/categories.json";
const processFile = require("./imageProcessor");
const storeUploads = require("./filemover.js");

const upload = storeUploads();

function routes() {
  const categoriesRouter = express.Router();
  categoriesRouter
    .route("/categories")
    .post(upload.array("newImage", 1), async (req, res, next) => {
      if (req.body.category) {
        const category = JSON.parse(req.body.category);
        const bigDestPath = `../spa-shop/public/shop/categories/${category.id}/`;
        //check for path. if it doesn't exist create it.
        const smallDestPath = `../spa-shop/public/shop/categories/smaller/${category.id}/`;
        //check for path. if it doesn't exitst, create it.
        try {
          if (req.files) {
            for (const file of req.files) {
              try {
                processFile(file, bigDestPath, smallDestPath);
                category.img = `${bigDestPath.replace("../spa-shop/public", "")}${file.filename}`;
              } catch (err) {
                console.log("Failed: file upload");
              }
            }
          }
          const oldShopDataString = fs.readFileSync(shopfilepath);
          const oldShopObject = JSON.parse(oldShopDataString);
          //categories:[]
          let newCategories = [...oldShopObject.categories];
          const newCatIndex = newCategories.findIndex((cat) => cat.id === category.id);
          //updates else adds
          if (newCatIndex !== -1) {
            newCategories[newCatIndex] = category;
          } else {
            newCategories.unshift(category);
          }
          const newShopData = { categories: newCategories };
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
