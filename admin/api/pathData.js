const fs = require("fs");

function getConfig() {
  const config = fs.readFileSync("./public/data/config.json");
  const pathToSite = JSON.parse(config).pathToSite;
  const siteData = fs.readFileSync(`${pathToSite}/public/data/site-data.json`);

  const pathToPublic = `${pathToSite}/public`;
  const pathToBuild = `${pathToSite}/build`;
  const siteURl = JSON.parse(siteData).live_site_url;

  return { pathToPublic, pathToBuild, siteURl };
}
module.exports = getConfig;
