const express = require("express");
const fs = require("fs");
const homefilepath = "../spa-shop/src/shared/layout/site-data.json";

function routes() {
  const homeRouter = express.Router();
  homeRouter
    .route("/home")
    .post((req, res) => {
      if (req.body.values) {
        const values = req.body.values;
        try {
          const oldHomeDataString = fs.readFileSync(homefilepath);
          const oldHomeObject = JSON.parse(oldHomeDataString);
          //left over from when all shop data lived in one file, but spanned apis.
          //it's essentially always a patch operation.
          const newHomeData = { ...oldHomeObject, ...values };
          fs.writeFileSync(homefilepath, JSON.stringify(newHomeData));
          return res.json({ message: "Updated Site data!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Home data update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    })
    .get((req, res) => {
      const homeData = fs.readFileSync(homefilepath);
      const home = JSON.parse(homeData);
      if (home) {
        res.json(home);
      }
    });
  return homeRouter;
}
module.exports = routes;
