const express = require("express");
const fs = require("fs");
const processRss = require("../src/bits/processBlogRSS");
const processFile = require("./imageProcessor");
const storeUploads = require("./filestore.js");
const getConfig = require("./pathData");

const { pathToPublic, siteURl } = getConfig();
const upload = storeUploads();

const blogfilepath = `${pathToPublic}/data/blog-data.json`;
const blogRSSpath = `${pathToPublic}/data/blog.rss`;

function routes() {
  const blogRouter = express.Router();
  blogRouter
    .route("/blog")
    .get((req, res) => {
      try {
        const blogData = fs.readFileSync(blogfilepath);
        const blog = JSON.parse(blogData);
        if (blog.entries) {
          return res.json(blog);
        } else {
          return res.json({ message: "Couldn't read blog file" });
        }
      } catch (error) {
        console.log(error);
        return res.json({ message: "Blog Data Get Failed" });
      }
    })
    .post((req, res) => {
      if (req.body) {
        try {
          const oldpageDataString = fs.readFileSync(blogfilepath);
          const oldpageObject = JSON.parse(oldpageDataString);
          const newpageData = { ...oldpageObject, ...req.body };
          fs.writeFileSync(blogfilepath, JSON.stringify(newpageData));
          return res.json({ message: "Updated Blog page!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Blog page update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    });
  blogRouter
    .route("/blog/:blogid")
    .post(upload.array("newImage", 1), async (req, res) => {
      const blogPostData = fs.readFileSync(blogfilepath);
      const blogEntries = JSON.parse(blogPostData);
      if (req.body.entry) {
        try {
          const update = JSON.parse(req.body.entry);
          const updateIndex = blogEntries.entries.findIndex(
            (entry) => entry.id === update.id || entry.title === update.title,
          );
          if (updateIndex !== -1) {
            blogEntries.entries[updateIndex] = update;
          } else {
            blogEntries.entries.unshift(update);
          }
          const bigDestPath = `${pathToPublic}/images/blog/`;
          //check for path. if it doesn't exist create it.
          const smallDestPath = `${pathToPublic}/images/blog/smaller/`;

          if (req.files) {
            for (const file of req.files) {
              try {
                processFile(file, 850, bigDestPath);
                processFile(file, 450, smallDestPath);
                update.image = `${bigDestPath.replace(pathToPublic, siteURl)}${file.filename}`;
              } catch (err) {
                console.log("Failed: file upload");
              }
            }
          }

          fs.writeFileSync(blogfilepath, JSON.stringify(blogEntries));

          const RSS = processRss(blogEntries);
          fs.writeFileSync(blogRSSpath, RSS);
          return res.json({ message: "Updated Blog!" });
        } catch (error) {
          console.log(error);
          return res.json({ message: "Blog update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    })
    .delete((req, res) => {
      try {
        const blogEntrieData = fs.readFileSync(blogfilepath);
        const blogEntries = JSON.parse(blogEntrieData);
        const entryToDelete = req.params.blogid;
        const entryIndex = blogEntries.entries.findIndex((entry) => entry.id === entryToDelete);
        const removedEntry = blogEntries.entries.splice(entryIndex, 1);
        const newblogEntries = blogEntries;
        fs.writeFileSync(blogfilepath, JSON.stringify(newblogEntries));
        const RSS = processRss(newblogEntries);
        fs.writeFileSync(blogRSSpath, RSS);
        return res.json({ message: `Removed entry: ${removedEntry.title}` });
      } catch (error) {
        console.log(error);
        return res.json({ message: `Failed to remove entry: ${req.params.blogid}` });
      }
    });
  return blogRouter;
}
module.exports = routes;
