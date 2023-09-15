const express = require("express");
const fs = require("fs");
const aboutfilepath = "../spa-shop/src/shared/about/about-data.json";

function routes() {
  const aboutRouter = express.Router();
  aboutRouter
    .route("/about")
    .post((req, res) => {
      if (req.body.aboutdata) {
        try {
          const oldAboutDataString = fs.readFileSync(aboutfilepath);
          const oldAboutObject = JSON.parse(oldAboutDataString);
          const newAboutData = { ...oldAboutObject, ...req.body };
          fs.writeFileSync(aboutfilepath, JSON.stringify(newAboutData));
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
      const aboutData = fs.readFileSync(aboutfilepath);
      const about = JSON.parse(aboutData);
      if (about) {
        res.json(about);
      }
    });
  return aboutRouter;
}
module.exports = routes;
