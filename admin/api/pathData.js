const fs = require("fs");

function getConfig() {
  const config = fs.readFileSync("./public/data/config.json");
  const pathToSite = JSON.parse(config).pathToSite;
  const siteData = fs.readFileSync(`${pathToSite}/public/data/site-data.json`);

  const pathToPublic = `${pathToSite}/public`;
  const siteURl = JSON.parse(siteData).live_site_url;
  const checkPath = (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  };
  return { pathToPublic, siteURl, checkPath };
}
module.exports = getConfig;
