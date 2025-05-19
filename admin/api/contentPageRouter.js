const express = require("express");
const fs = require("fs");
const getConfig = require("./pathData");

const { pathToPublic, checkFile } = getConfig();
const rootdir = `${pathToPublic}/data`;

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

  pageRouter
    .route("/pages_list")
    .get((req, res) => {
      if (!fs.existsSync(`${rootdir}/pages.json`)) {
        fs.writeFileSync(`${rootdir}/pages.json`, JSON.stringify({ pages: [] }));
        return res.json({ message: "No pages yet." });
      } else {
        const pagesRaw = fs.readFileSync(`${rootdir}/pages.json`);
        const pages = JSON.parse(pagesRaw);
        if (pages.pages) {
          return res.json(pages.pages);
        } else {
          return res.json({ message: "No pages yet." });
        }
      }
    })
    .post((req, res) => {
      const pages = req.body;
      if (pages.length > 0) {
        fs.writeFileSync(`${rootdir}/pages.json`, JSON.stringify({ pages: pages }));
        return res.json({ message: "Updated pages!" });
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    });

  return pageRouter;
}
module.exports = routes;
//TODO get list of pages, create pages, delete pages as well as get and set page. I think this could be easily achieved with a pages subdirectory in data/
