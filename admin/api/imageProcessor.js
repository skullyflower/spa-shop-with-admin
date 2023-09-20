const Jimp = require("jimp");

function processFile(file, bigDestinationPath, smallDestinationPath) {
  if (file.filename.match(/.*[.][jpg][ienp][pgf]/)) {
    //resize image to big
    Jimp.read(`${file.path}`)
      .then((image) => {
        return image
          .resize(750, Jimp.AUTO) // resize
          .write(`${bigDestinationPath}${file.filename}`); // save
      })
      .catch((err) => {
        console.log(`failed to resize Big:  ${err}`);
      });

    //resize image to small
    Jimp.read(`${file.path}`)
      .then((image) => {
        return image
          .resize(450, Jimp.AUTO) // resize
          .write(`${smallDestinationPath}${file.filename}`); // save
      })
      .catch((err) => {
        console.log(`failed to resize Small:  ${err}`);
      });
  }
}
module.exports = processFile;
