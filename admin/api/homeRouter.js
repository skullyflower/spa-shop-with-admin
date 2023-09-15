const express = require("express");
const fs = require("fs");
const homefilepath = "../spa-shop/src/shared/layout/site-data.json";

function routes() {
  const homeRouter = express.Router();
  homeRouter
    .route("/about")
    .post((req, res) => {
      if (req.body.aboutdata) {
        try {
          const oldHomeDataString = fs.readFileSync(homefilepath);
          const oldHomeObject = JSON.parse(oldHomeDataString);
          const newHomeData = { ...oldHomeObject, ...req.body };
          fs.writeFileSync(homefilepath, JSON.stringify(newHomeData));
          return res.json({ message: "Updated about!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "about update failed." });
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
