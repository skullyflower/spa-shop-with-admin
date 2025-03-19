const express = require("express");
const fs = require("fs");
const getConfig = require("./pathData");

const { pathToPublic } = getConfig();

const shopfilepath = `${pathToPublic}/data/subjects.json`;
const processFile = require("./imageProcessor.js");
const storeUploads = require("./filestore.js");

const upload = storeUploads();

function routes() {
  const subjectssRouter = express.Router();
  subjectssRouter
    .route("/subjects")
    .post(upload.array("newImage", 1), async (req, res, next) => {
      if (req.body.subject) {
        const subject = JSON.parse(req.body.subject);
        const bigDestPath = `${pathToPublic}/shop/subjects/${subject.id}/`;
        //check for path. if it doesn't exist create it.
        const smallDestPath = `${pathToPublic}/shop/subjects/smaller/${subject.id}/`;
        //check for path. if it doesn't exitst, create it.
        try {
          if (req.files) {
            for (const file of req.files) {
              try {
                processFile(file, 850, bigDestPath);
                processFile(file, 450, smallDestPath);
                subject.img = `${bigDestPath.replace(pathToPublic, "")}${file.filename}`;
              } catch (err) {
                console.log("Failed: file upload");
              }
            }
          }
          const oldShopDataString = fs.readFileSync(shopfilepath);
          const oldShopObject = JSON.parse(oldShopDataString);
          //subjects:[]
          let newsubjects = [...oldShopObject.subjects];
          const newCatIndex = newsubjects.findIndex((cat) => cat.id === subject.id);
          //updates else adds
          if (newCatIndex !== -1) {
            newsubjects[newCatIndex] = subject;
          } else {
            newsubjects.unshift(subject);
          }
          const newShopData = { subjects: newsubjects };
          fs.writeFileSync(shopfilepath, JSON.stringify(newShopData));

          return res.json({ message: "Updated Shop Subjects!" });
        } catch (err) {
          console.log(err);
          return res.json({ message: "Subjects update failed." });
        }
      } else {
        return res.json({ message: "You must fill out all fields." });
      }
    })
    .get((req, res) => {
      const shopData = fs.readFileSync(shopfilepath);
      const shop = JSON.parse(shopData);
      if (shop.subjects) {
        return res.json(shop.subjects);
      }
    });
  // TODO: add check for prods with the subject
  subjectssRouter.route("/subjects/:catId").delete((req, res) => {
    try {
      const catToDelete = req.params.catId;
      const shopData = fs.readFileSync(shopfilepath);
      const shop = JSON.parse(shopData);
      if (
        shop.subjects &&
        shop.subjects[shop.subjects.findIndex((cat) => cat.id === catToDelete)]
      ) {
        const allsubjects = shop.subjects;
        var newsubjectData = allsubjects.filter((cats) => cats.id !== catToDelete);
        const newShopObj = { ...shop, subjects: newsubjectData };
        const newShopData = JSON.stringify(newShopObj);
        fs.writeFileSync(shopfilepath, newShopData);
        return res.json({ message: `Successfully deleted ${catToDelete}` });
      }
      res.json({ message: `Couldn't find ${req.params.catId} in the list.` });
    } catch (err) {
      console.log(err);
      res.json({ message: `Failed to delete ${req.params.catId}` });
    }
  });
  return subjectssRouter;
}
module.exports = routes;
