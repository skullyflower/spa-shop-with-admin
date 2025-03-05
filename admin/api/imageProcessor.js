const Jimp = require("jimp");
const fs = require("fs");

async function processFile(file, size, DestinationPath, newName = "") {
  if (file.filename.match(/.*[.][jpg][ienp][pgfe][g]{0,1}/)) {
    return Jimp.read(`${file.path}`)
      .then((image) => {
        return image
          .resize(size, Jimp.AUTO) // resize
          .writeAsync(`${file.path}_${size}`);
      })
      .then(() => {
        const filename = newName ? newName : file.filename;
        fs.renameSync(`${file.path}_${size}`, `${DestinationPath}${filename}`);
        return "success";
      })
      .catch((err) => {
        console.log(`failed to resize Big:  ${err}`);
      });
  }
  return false;
}
module.exports = processFile;
