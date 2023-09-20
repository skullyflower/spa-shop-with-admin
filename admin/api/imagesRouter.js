const express = require("express");
const multer = require("multer");
const fs = require("fs");
const processFile = require("./imageProcessor");

const rawImagesPath = "./public/files/";
const bigSourcePath = "./public/files/big/";
const smallSourcePath = "./public/files/small/";
const publicPath = "../spa-shop/public/";

const getDestinationPaths = (topdir, subdir) => {
  if (subdir !== "bigger" && topdir !== "images") {
    return {
      pubPathBig: `${publicPath}${topdir}/${subdir}/bigger/`,
      pubPathSmall: `${publicPath}${topdir}/${subdir}/`,
    };
  }
  return {
    pubPathBig: `${publicPath}${topdir}/${subdir}/`,
    pubPathSmall: `${publicPath}${topdir}/`,
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
            (file) => file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".gif"),
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
    });

  imagesRouter.route("/folders/:toplevel").get((req, res) => {
    const topLeveDestination = req.params.toplevel;
    const dirpattern = /^[^.]*$/;
    fs.readdir(`../spa-shop/public/${topLeveDestination}`, (err, files) => {
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

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, rawImagesPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  imagesRouter.route("/imageupload").post(upload.array("images", 4), async (req, res) => {
    console.log("hit upload endpoint!");
    if (!req.files) {
      return res.json({ message: "Can't find uploaded files." });
    } else {
      console.log(req.files);
      for (const file of req.files) {
        try {
          processFile(file, bigSourcePath, smallSourcePath);
        } catch (err) {
          console.log("Failed: file upload");
          return res.json({
            status: "failed",
            message: err,
          });
        }
      }
    }
    console.log("files uploaded");
    return res.json({ message: "Files Uploaded" });
  });

  return imagesRouter;
}
module.exports = routes;
