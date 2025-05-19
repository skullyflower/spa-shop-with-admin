const express = require("express");
const fs = require("fs");
const getConfig = require("./pathData");

function routes() {
  const configRouter = express.Router();
  const { configfilepath } = getConfig();

  configRouter
    .route("/config")
    .post(async (req, res) => {
      if (req.body.pathToSite) {
        const pathToSite = req.body.pathToSite;
        try {
          fs.writeFileSync(configfilepath, JSON.stringify({ pathToSite: pathToSite }));
          return res.json({ message: "Updated Config page data!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Config page data update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    })
    .get(async (req, res) => {
      try {
        const configDataString = fs.readFileSync(configfilepath);
        const configDataObject = JSON.parse(configDataString);
        return res.json(configDataObject);
      } catch (err) {
        console.log(err);
        return res.json({ message: "Config page data retrieval failed." });
      }
    });

  return configRouter;
}
module.exports = routes;
