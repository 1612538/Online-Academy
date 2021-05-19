const express = require('express');
const router = express.Router();
const Cat = require('../models/Categories');
const bodyParser = require('body-parser');
const SmallCat = require('../models/Small_Categories');

router.get('/', async(req, res) => {
    const cats = await Cat.all();
    if (cats.length > 0) {
        for (let cat of cats) {
            cat.isActive = false;
        }
        cats[0].isActive = true;
    }
    const smallcats = await SmallCat.all();
    res.render('admin_categories', {
        title: 'Management - Main Categories',
        cats: cats,
        smallcats: smallcats,
        layout: 'admin'
    });
})

router.post('/addCategory/', async(req, res) => {
    const cat = {
        name: req.body.catNameNew
    }
    const catID = await Cat.add(cat);
    res.redirect('/management/main-categories');
})

router.post('/deleteCategory/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    const cat = await Cat.deleteById(id);
    res.redirect('/management/main-categories');
})

router.post('/updateCategory/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    const cat = {
        idcategory: id,
        name: req.body['catName' + id]
    }
    const result = Cat.updateByEntity(cat);
    res.redirect('/management/main-categories');
})

module.exports = router;