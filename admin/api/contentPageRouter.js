const express = require("express");
const fs = require("fs");

function routes() {
  const pageRouter = express.Router();
  pageRouter.route("/pages").get((req, res) => {
    const files = fs.readdirSync(`../spa-shop/src/pages/`);
    return res.json({ files: files });
  });
  pageRouter
    .route("/pages/:page")
    .get((req, res) => {
      const page = req.params.page;
      const pagefilepath = `../spa-shop/src/pages/${page}/${page}-data.json`;
      const pageDataJson = fs.readFileSync(pagefilepath);
      const pageData = JSON.parse(pageDataJson);
      if (pageData) {
        res.json(pageData);
      }
    })
    .post((req, res) => {
      const page = req.params.page;
      if (req.body.pagedata) {
        try {
          const pagefilepath = `../spa-shop/src/pages/${page}/${page}-data.json`;
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
