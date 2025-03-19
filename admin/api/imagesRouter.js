const express = require("express");
const fs = require("fs");
const processFile = require("./imageProcessor");
const storeUploads = require("./filestore.js");
const getConfig = require("./pathData");

const { pathToPublic, checkPath } = getConfig();

const upload = storeUploads();

const bigSourcePath = "./public/files/big/";
const smallSourcePath = "./public/files/small/";
const publicPath = `${pathToPublic}`;
const galleriesFile = `${pathToPublic}/data/galleries_list.json`;
const categoriesFile = `${pathToPublic}/data/categories.json`;

const getDestinationPaths = (topdir, subdir = "smaller") => {
  if (subdir !== "smaller") {
    // for shop images that go inside the category folder
    return {
      pubPathBig: `${publicPath}/${topdir}/${subdir}/`,
      pubPathSmall: `${publicPath}/${topdir}/${subdir}/smaller/`,
    };
  }
  return {
    pubPathBig: `${publicPath}/${topdir}/`,
    pubPathSmall: `${publicPath}/${topdir}/${subdir}/`,
  };
};

function routes() {
  const imagesRouter = express.Router();

  imagesRouter
    .all("*", (req, res, next) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:3001");
      res.set("Access-Control-Allow-Methods", "GET, POST,PUT,PATCH,DELETE");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      next();
    })
    .route("/images")
    .get((req, res) => {
      try {
        const files = fs.readdirSync(bigSourcePath);
        if (files) {
          const filtered = files.filter(
            (file) =>
              file.endsWith(".jpeg") ||
              file.endsWith(".jpg") ||
              file.endsWith(".png") ||
              file.endsWith(".gif"),
          );
          if (filtered.length) {
            return res.json(filtered);
          }
          return res.json({ message: "No images to move." });
        }
      } catch (err) {
        if (err) {
          return res.json({ message: "Couldn't read directory." }).end();
        }
      }
      return res.json({ message: "No images to move." });
    })
    .post((req, res) => {
      if (
        req.body.filesToMove &&
        req.body.filesToMove.length > 0 &&
        req.body.toplevel &&
        req.body.secondLevels
      ) {
        const filearray = !Array.isArray(req.body.filesToMove)
          ? [req.body.filesToMove]
          : req.body.filesToMove;

        const destPaths = getDestinationPaths(req.body.toplevel, req.body.secondLevels);
        const bigDestPath = destPaths.pubPathBig;
        const smallDestPath = destPaths.pubPathSmall;
        checkPath(bigDestPath);
        checkPath(smallDestPath);
        var message = "";
        var smallfiles = [];
        try {
          smallfiles = fs.readdirSync(smallSourcePath);
        } catch (err) {}
        filearray.forEach((file) => {
          try {
            /** copy to public */
            fs.renameSync(`${bigSourcePath}${file}`, `${bigDestPath}${file}`);
          } catch (err) {
            message += `Failed to move big ${bigSourcePath}${file} to  ${bigDestPath}${file}\n`;
          }
          if (smallfiles.includes(file)) {
            try {
              /** copy to public */
              fs.renameSync(`${smallSourcePath}${file}`, `${smallDestPath}${file}`);
            } catch (err) {
              message += `Failed to move small ${file} file\n`;
            }
          }
          if (!message.length) {
            message += "Successfully moved files!!";
          }
        });
        console.log(message);
        return res.json({ message: message });
      }
      return res.json({ message: "You must fill out all fields." });
    })
    .put((req, res) => {
      if ((req.body.imageurl, req.body.newname)) {
        const relativePath = req.body.imageurl;
        const biggerRelativePath = `${relativePath.substring(
          0,
          relativePath.lastIndexOf("/"),
        )}/bigger${relativePath.substring(relativePath.lastIndexOf("/"))}`;
        try {
          fs.renameSync(
            `${publicPath}${relativePath}`,
            `${publicPath}${relativePath.substring(0, relativePath.lastIndexOf("/"))}/${
              req.body.newname
            }`,
          );
          fs.renameSync(
            `${publicPath}${biggerRelativePath}`,
            `${publicPath}${biggerRelativePath.substring(0, biggerRelativePath.lastIndexOf("/"))}/${
              req.body.newname
            }`,
          );
          return res.json({ message: `Successfully renamed ${req.body.imageurl}` });
        } catch (error) {
          return res.json({ message: `Failed to rename ${req.body.imageurl}` });
        }
      }
    })
    .delete((req, res) => {
      if (req.body.imageurl) {
        const relativePath = req.body.imageurl;
        const biggerRelativePath = `${relativePath.substring(
          0,
          relativePath.lastIndexOf("/"),
        )}/bigger${relativePath.substring(relativePath.lastIndexOf("/"))}`;
        try {
          console.log(relativePath);
          if (relativePath.includes("files")) {
            fs.rmSync(`./public${relativePath}`);
            return res.json({ message: `Successfully removed ${req.body.imageurl}` });
          } else {
            fs.rmSync(`${publicPath}/${relativePath}`);
            fs.rmSync(`${publicPath}${biggerRelativePath}`);
          }
          return res.json({ message: `Successfully removed ${req.body.imageurl}` });
        } catch (error) {
          return res.json({ message: `Failed to remove ${req.body.imageurl}` });
        }
      }
    });

  imagesRouter.route("/folders").get((req, res) => {
    const toplevels = ["images"];
    const galleryData = fs.readFileSync(galleriesFile);
    const galleries = JSON.parse(galleryData);
    const galleryKeys = Object.keys(galleries);
    if (galleryKeys.length) {
      checkPath(`${pathToPublic}/galleries`);
      toplevels.push("galleries");

      galleryKeys.forEach((gallery) => {
        if (galleries[gallery].path) {
          checkPath(`${pathToPublic}/${galleries[gallery].path}`);
        }
      });
    }
    const shopData = fs.readFileSync(categoriesFile);
    const shop = JSON.parse(shopData);
    if (shop.categories) {
      checkPath(`${pathToPublic}/shop`);
      toplevels.push("shop");
      shop.categories
        .filter((cat) => !!cat.id)
        .forEach((cat) => {
          checkPath(`${pathToPublic}/shop/${cat.id}`); //check for path. if it doesn't exist create it.
        });
    }
    return res.json(toplevels);
  });

  imagesRouter.route("/folders/:toplevel").get((req, res) => {
    const topLeveDestination = req.params.toplevel;
    const dirpattern = /^[^.]*$/;
    fs.readdir(`${pathToPublic}/${topLeveDestination}`, (err, files) => {
      if (err) {
        console.log(err);
        checkPath(`${pathToPublic}/${topLeveDestination}/smaller`);
        return res.json(["smaller"]);
      }
      if (files) {
        const filtered = files.filter((file) => dirpattern.test(file));
        return res.json(filtered);
      }
    });
    return;
  });

  imagesRouter.route("/imageupload").post(upload.array("images", 10), async (req, res) => {
    console.log("hit upload endpoint!");
    if (req.files) {
      let destPaths = null;
      const messages = [];
      if (req.body.dest) {
        const pathBits = req.body.dest.includes("/") ? req.body.dest.split("/") : false;
        const topdir = pathBits ? pathBits[0] : req.body.dest;
        const subdir = pathBits ? pathBits[1] : "smaller";
        destPaths = getDestinationPaths(topdir, subdir);
      }
      const bigDestPath = destPaths?.pubPathBig ?? bigSourcePath;
      const smallDestPath = destPaths?.pubPathSmall ?? smallSourcePath;

      for (const file of req.files) {
        try {
          try {
            await processFile(file, 750, bigSourcePath);
            await processFile(file, 450, smallSourcePath);
          } catch (err) {
            messages.push(`Could not process file:${err}`);
          }
          if (destPaths) {
            try {
              checkPath(bigDestPath);
              fs.readFileSync(`${bigSourcePath}${file.filename}`, `${bigDestPath}${file.filename}`);
            } catch (err) {
              messages.push(`Could not move big file:${file.filename} to ${bigDestPath}:${err}`);
            }
            try {
              checkPath(smallDestPath);
              fs.renameSync(
                `${smallSourcePath}${file.filename}`,
                `${smallDestPath}${file.filename}`,
              );
            } catch (err) {
              messages.push(
                `Could not move small file:${file.filename} to ${smallDestPath}:${err}`,
              );
            }
          }
          try {
            fs.rmSync(file.path);
          } catch (err) {
            messages.push(`Could not remove file:${file.filename}`);
          }
        } catch (err) {
          console.log(`Failed: file upload ${err}`);
          return res.json({
            message: `Failed: file upload ${messages.join(", ")}`,
          });
        }
      }
      console.log("files uploaded to ", bigDestPath);
      return res.json({ message: `Files Uploaded:  ${smallDestPath}` });
    } else {
      return res.json({ message: "No uploaded files." });
    }
  });

  return imagesRouter;
}
module.exports = routes;
