const fs = require("fs");

function getConfig() {
  try {
    fs.readFileSync("./config.json");
  } catch (err) {
    console.log("No config.json file found. Please create one in the root directory of your site.");
    process.exit();
  }
  const config = fs.readFileSync("./config.json");

  const configfilepath = `./config.json`;
  const pathToSite = JSON.parse(config).pathToSite;
  const siteData = fs.readFileSync(`${pathToSite}/public/data/site-data.json`);

  const pathToPublic = `${pathToSite}/public`;

  const siteURl = JSON.parse(siteData).live_site_url;

  const checkPath = (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  };

  const checkFile = (path, defaultVal) => {
    if (!fs.existsSync(path)) {
      console.log(`No file found at ${path}. Creating one with default
      values
      `);
      fs.writeFileSync(path, JSON.stringify(defaultVal ?? {}));
    }
  };

  return { configfilepath, pathToPublic, siteURl, checkPath, checkFile };
}
module.exports = getConfig;
