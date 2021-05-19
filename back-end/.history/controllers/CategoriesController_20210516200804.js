const express = require("express");
const router = express.Router();
const Cat = require("../models/Categories");
const bodyParser = require("body-parser");
const SmallCat = require("../models/Small_Categories");

router
  .get("/category/api", async (req, res) => {
    let cats = await Cat.all();
    if (cats.length > 0) {
      for (let cat of cats) {
        cat.isActive = false;
      }
      cats[0].isActive = true;
    }
    res.send({
      categories: cats,
    });
  })
  .post("/category/api", async (req, res) => {
    const cat = {
      name: req.body.catNameNew,
    };
    const catID = await Cat.add(cat);
    res.send({
      category: cat,
      success: true,
    });
  })
  .delete("/category/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    const cat = await Cat.deleteById(id);
    res.send({
      success: true,
    });
  })
  .put("/category/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    const cat = {
      idcategory: id,
      name: req.body["catName" + id],
    };
    const result = Cat.updateByEntity(cat);
    res.send({});
  });

module.exports = router;
