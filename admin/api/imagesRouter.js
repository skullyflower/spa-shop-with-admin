const express = require("express");
const fs = require("fs");
const processFile = require("./imageProcessor");
const storeUploads = require("./filestore.js");
const getConfig = require("./pathData");

const { pathToPublic, pathToBuild } = getConfig();

const upload = storeUploads();

// path from skullyflower/admin/
const bigSourcePath = "./public/files/big/";
const smallSourcePath = "./public/files/small/";
const publicPath = `${pathToPublic}/`;
const buildPath = `${pathToBuild}/`;

const getDestinationPaths = (topdir, subdir = "bigger") => {
  if (subdir !== "bigger" && topdir !== "images") {
    return {
      pubPathBig: `${publicPath}${topdir}/${subdir}/bigger/`,
      pubPathSmall: `${publicPath}${topdir}/${subdir}/`,
      buildPathBig: `${buildPath}${topdir}/${subdir}/bigger/`,
      buildPathSmall: `${buildPath}${topdir}/${subdir}/`,
    };
  }
  return {
    pubPathBig: `${publicPath}${topdir}/${subdir}/`,
    pubPathSmall: `${publicPath}${topdir}/`,
    buildPathBig: `${buildPath}${topdir}/${subdir}/`,
    buildPathSmall: `${buildPath}${topdir}/`,
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
        const bigDestPath_build = destPaths.buildPathBig;
        const smallDestPath_build = destPaths.buildPathSmall;
        var message = "";
        var smallfiles = [];
        try {
          smallfiles = fs.readdirSync(smallSourcePath);
        } catch (err) {}
        filearray.forEach((file) => {
          try {
            /** copy to public */
            fs.copyFileSync(`${bigSourcePath}${file}`, `${bigDestPath}${file}`);
            fs.linkSync(
              `${bigDestPath}${file}`,
              `${bigDestPath.replace("skullyflower", "skullyflowerTS")}${file}`,
            );
          } catch (err) {
            message += `Failed to copy big ${bigSourcePath}${file} to  ${bigDestPath}${file}\n`;
          }
          try {
            /** move to build */
            fs.renameSync(`${bigSourcePath}${file}`, `${bigDestPath_build}${file}`);
          } catch (err) {
            message += `Failed to move big ${bigSourcePath}${file} to ${bigDestPath_build}${file} file\n`;
          }
          if (smallfiles.includes(file)) {
            try {
              /** copy to public */
              fs.copyFileSync(`${smallSourcePath}${file}`, `${smallDestPath}${file}`);
              fs.linkSync(
                `${smallDestPath}${file}`,
                `${smallDestPath.replace("skullyflower", "skullyflowerTS")}${file}`,
              );
            } catch (err) {
              console.log(err, `Failed to copy small ${file} file\n`);
              message += `Failed to copy small ${file} file\n`;
            }
            try {
              /** move to build */
              fs.renameSync(`${smallSourcePath}${file}`, `${smallDestPath_build}${file}`);
            } catch (err) {
              console.log(err, `Failed to move small ${file} file`);
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
          fs.renameSync(
            `${buildPath}${relativePath}`,
            `${buildPath}${relativePath.substring(0, relativePath.lastIndexOf("/"))}/${
              req.body.newname
            }`,
          );
          fs.renameSync(
            `${buildPath}${biggerRelativePath}`,
            `${buildPath}${biggerRelativePath.substring(0, biggerRelativePath.lastIndexOf("/"))}/${
              req.body.newname
            }`,
          );
          fs.renameSync(
            `${publicPath.replace("skullyflower", "skullyflowerTS")}${relativePath}`,
            `${publicPath.replace("skullyflower", "skullyflowerTS")}${relativePath.substring(
              0,
              relativePath.lastIndexOf("/"),
            )}/${req.body.newname}`,
          );
          fs.renameSync(
            `${publicPath.replace("skullyflower", "skullyflowerTS")}${biggerRelativePath}`,
            `${publicPath.replace("skullyflower", "skullyflowerTS")}${biggerRelativePath.substring(
              0,
              biggerRelativePath.lastIndexOf("/"),
            )}/${req.body.newname}`,
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
            fs.rmSync(`${buildPath}/${relativePath}`);
            fs.rmSync(`${buildPath}${biggerRelativePath}`);
            fs.rmSync(`${publicPath.replace("skullyflower", "skullyflowerTS")}/${relativePath}`);
            fs.rmSync(
              `${publicPath.replace("skullyflower", "skullyflowerTS")}${biggerRelativePath}`,
            );
          }
          return res.json({ message: `Successfully removed ${req.body.imageurl}` });
        } catch (error) {
          return res.json({ message: `Failed to remove ${req.body.imageurl}` });
        }
      }
    });

  imagesRouter.route("/folders/:toplevel").get((req, res) => {
    const topLeveDestination = req.params.toplevel;
    const dirpattern = /^[^.]*$/;
    fs.readdir(`${pathToBuild}/${topLeveDestination}`, (err, files) => {
      if (err) {
        console.log(err);
        return res.json({ message: "Can't get the subirectories." });
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
        const subdir = pathBits ? pathBits[1] : "bigger";
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
              fs.copyFileSync(`${bigSourcePath}${file.filename}`, `${bigDestPath}${file.filename}`);
            } catch (err) {
              messages.push(`Could not copy big file:${file.filename} to ${bigDestPath}:${err}`);
            }
            try {
              fs.copyFileSync(
                `${smallSourcePath}${file.filename}`,
                `${smallDestPath}${file.filename}`,
              );
            } catch (err) {
              messages.push(
                `Could not copy small file:${file.filename} to ${smallDestPath}:${err}`,
              );
            }
            try {
              fs.copyFileSync(
                `${smallSourcePath}${file.filename}`,
                `${smallDestPath.replace("public/", "build/")}${file.filename}`,
              );
            } catch (err) {
              messages.push(`Could not copy small file:${file.filename} to build:${err}`);
            }
            try {
              fs.copyFileSync(
                `${bigSourcePath}${file.filename}`,
                `${bigDestPath.replace("public/", "build/")}${file.filename}`,
              );
            } catch (err) {
              messages.push(`Could not copy big file:${file.filename} to build:${err}`);
            }
            try {
              fs.linkSync(
                `${bigDestPath}${file.filename}`,
                `${bigDestPath.replace("skullyflower", "skullyflowerTS")}${file.filename}`,
              );
            } catch (err) {
              messages.push(`Could not link big file:${file.filename} to TS:${err}`);
            }
            try {
              fs.linkSync(
                `${smallDestPath}${file.filename}`,
                `${smallDestPath.replace("skullyflower", "skullyflowerTS")}${file.filename}`,
              );
            } catch (err) {
              messages.push(`Could not link small file:${file.filename} to TS:${err}`);
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
