const express = require("express");
const fs = require("fs");
const processRss = require("../src/bits/processBlogRSS");
const processFile = require("./imageProcessor");
const storeUploads = require("./filemover.js");

const upload = storeUploads();

const blogfilepath = "../spa-shop/public/data/blog-data.json";
const blogRSSpath = "../spa-shop/public/blog.rss";

function routes() {
  const blogRouter = express.Router();
  blogRouter
    .route("/blog")
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
          const bigDestPath = `../spa-shop/public/images/`;
          //check for path. if it doesn't exist create it.
          const smallDestPath = `../spa-shop/public/images/smaller/`;

          if (req.files) {
            for (const file of req.files) {
              try {
                processFile(file, bigDestPath, smallDestPath);
                update.image = `${bigDestPath.replace("../spa-shop/public", "")}${file.filename}`;
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
    });
  blogRouter.route("/blog/:blogid").delete((req, res) => {
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
