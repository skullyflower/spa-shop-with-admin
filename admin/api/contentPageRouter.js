const express = require("express");
const fs = require("fs");

const rootdir = "../spa-shop/public/data";

function routes() {
  const pageRouter = express.Router();
  pageRouter.route("/pages").get((req, res) => {
    const files = fs.readdirSync(rootdir);
    return res.json({ files: files });
  });
  pageRouter
    .route("/pages/:page")
    .get((req, res) => {
      const page = req.params.page;
      const pagefilepath = `${rootdir}/${page}-data.json`;
      const pageDataJson = fs.readFileSync(pagefilepath);
      const pageData = JSON.parse(pageDataJson);
      if (pageData) {
        res.json(pageData);
      }
    })
    .post((req, res) => {
      const page = req.params.page;
      const pagefilepath = `${rootdir}/${page}-data.json`;
      if (req.body) {
        try {
          const oldpageDataString = fs.readFileSync(pagefilepath);
          const oldpageObject = JSON.parse(oldpageDataString);
          const newpageData = { ...oldpageObject, ...req.body };
          fs.writeFileSync(pagefilepath, JSON.stringify(newpageData));
          return res.json({ message: "Updated page!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "page update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    });

  return pageRouter;
}
module.exports = routes;
