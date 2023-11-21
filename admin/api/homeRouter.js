const express = require("express");
const fs = require("fs");
const multer = require("multer");
const homefilepath = "../spa-shop/public/data/site-data.json";

const rawImagesPath = "../spa-shop/public/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, rawImagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

function routes() {
  const homeRouter = express.Router();
  homeRouter
    .route("/home")
    .post(upload.array("newsitelogo", 1), async (req, res) => {
      if (req.body.values) {
        const values = JSON.parse(req.body.values);
        try {
          const oldHomeDataString = fs.readFileSync(homefilepath);
          const oldHomeObject = JSON.parse(oldHomeDataString);
          //left over from when all shop data lived in one file, but spanned apis.
          //it's essentially always a patch operation.
          const newHomeData = { ...oldHomeObject, ...values };
          fs.writeFileSync(homefilepath, JSON.stringify(newHomeData));
          return res.json({ message: "Updated Homepage data!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Homepage data update failed." });
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
