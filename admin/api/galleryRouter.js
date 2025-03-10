const express = require("express");
const fs = require("fs");
const getConfig = require("./pathData");

const { pathToPublic } = getConfig();
const galleries_json = `${pathToPublic}/data/galleries_list.json`;

function getGalleries() {
  const gallerData = fs.readFileSync(galleries_json);
  return JSON.parse(gallerData);
}

function getImages(path) {
  const files_path = `${pathToPublic}/${path}`;
  const all_files = fs.readdirSync(files_path);
  if (Array.isArray(all_files) && all_files.length) {
    return all_files;
  } else {
    console.log(`No files in ${files_path}`);
  }
}

function resetImages(gallery) {
  const { json_path, path, isStory } = gallery;
  const public_file = `${pathToPublic}${json_path}`;
  const build_file = public_file.replace("public", "build");
  const img_files = {};
  const all_files = getImages(path);
  if (Array.isArray(all_files) && all_files.length) {
    if (isStory) {
      all_files.sort(); //date acending
    } else {
      all_files.sort().reverse(); //date decending
    }
    all_files.forEach((onefile) => {
      const imgPattern = /(.*)\.[jpg][ienp][pgfe][g]{0,1}$/;
      if (imgPattern.test(onefile)) {
        const imagename = imgPattern.exec(onefile)[1];
        // get filename minus extension yyyymmddTitleTitle.gif
        img_files[imagename] = { imgfile: onefile };
        const breakdownpattern = /(^[0-9]{8})(.*).[jpg][ienp][pgfe][g]{0,1}$/;

        const imagebits = breakdownpattern.exec(onefile);
        if (imagebits && imagebits[2]) {
          img_files[imagename]["imgtitle"] = imagebits[2]
            .replace(/([A-Z])/g, " $1")
            .replace(/_/g, " ")
            .trim();
          // grab just the year part of the date.
          img_files[imagename]["imgyear"] = imagebits[1].slice(0, 4);
        } else {
          img_files[imagename]["imgtitle"] = imagename
            .replace(/([A-Z])/g, " $1")
            .replace(/_/g, " ")
            .trim();
          img_files[imagename]["imgyear"] = 2007;
        }
      }
    });

    fs.writeFileSync(public_file, JSON.stringify(img_files));
    fs.writeFileSync(build_file, JSON.stringify(img_files));
    return JSON.stringify(img_files);
  }
  console.log(`Failed reset for ${public_file}`);

  return false;
}

function routes() {
  const galleryRouter = express.Router();
  galleryRouter
    .route("/galleries")
    .get((req, res) => {
      try {
        const galleries = getGalleries();
        return res.json(galleries);
      } catch (err) {
        return res.json({ message: "Couldn't read galleries list file." });
      }
    })
    .post((req, res) => {
      if (req.body.gallery) {
        const all = getGalleries();
        var galleries = all.galleries;
        if (!Array.isArray(galleries)) {
          throw new Error("Cannot Get Galleries");
        }
        const gallery = req.body.gallery;
        const { id, title, json_path, path } = gallery;
        if (!!id && !!title && !!json_path && !!path) {
          const gall_index = galleries.findIndex((g) => g.id === id);
          if (gall_index !== -1) {
            galleries[gall_index] = gallery; //replace
          } else {
            galleries.push(gallery); //add
            fs.writeFileSync(`${pathToPublic}${json_path}`, JSON.stringify({}));
          }
          fs.writeFileSync(`${galleries_json}`, JSON.stringify({ galleries: galleries }));
          return res.json({ message: `Updated gallery; ${gallery.title}!` });
        } else {
          return res.json({ message: "You must fill out all required fields." });
        }
      }
    });

  galleryRouter.route("/gallery/:gallery_id").get((req, res) => {
    try {
      const galleryId = req.params.gallery_id;
      const galleries = getGalleries();
      if (!Array.isArray(galleries.galleries)) {
        throw new Error("Cannot Get Galleries");
      }
      const gallery = galleries.galleries.find((g) => g.id === galleryId);
      if (gallery === undefined) {
        throw new Error("Cannot Get Gallery");
      }

      const galleryFile = gallery?.json_path ?? galleries[0].json_path;
      const gallery_json = fs.readFileSync(`${pathToPublic}${galleryFile}`);
      return res.json(JSON.parse(gallery_json));
    } catch (err) {
      return res.json({
        message: `Couldn't read file for ${req.params.gallery_id} ${err}`,
      });
    }
  });

  galleryRouter.route("/reset").post((req, res) => {
    if (req.body) {
      const gallery = req.body.gallery;
      var images = false;
      images = resetImages(gallery, false); //small
      images = resetImages(gallery, true); //bigger
      if (images) {
        return res.json({ message: "Success!" });
      } else {
        return res.json({ message: "FAIL!!!" });
      }
    }
  });
  return galleryRouter;
}
module.exports = routes;
