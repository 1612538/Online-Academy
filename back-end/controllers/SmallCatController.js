const express = require('express');
const router = express.Router();
const Cat = require('../models/Categories');
const SmallCat = require('../models/Small_Categories');
const bodyParser = require('body-parser');

router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const smallcat = await SmallCat.getByCatId(id);
    const cat = await Cat.getById(id);
    const cats = await Cat.all();
    const smallcats = await SmallCat.all();
    res.render('admin_smallcategories', {
        title: 'Management - ' + cat.name,
        cats: cats,
        smallcats: smallcats,
        smallcat: smallcat,
        catID: id,
        layout: 'admin'
    });
})

router.post('/:id/addSCategory/', async(req, res) => {
    const cat = {
        name: req.body.catNameNew,
        idcategory: parseInt(req.params.id),
        count: 0
    }
    const catID = await SmallCat.add(cat);
    res.redirect('/management/categories/' + req.params.id);
})

router.post('/:id/deleteSCategory/:idsmall', async(req, res) => {
    let idsmall = parseInt(req.params.idsmall);
    const cat = await SmallCat.deleteById(idsmall);
    res.redirect('/management/categories/' + req.params.id);
})

router.post('/:id/updateSCategory/:idsmall', async(req, res) => {
    let idsmall = parseInt(req.params.idsmall);
    const cat = {
        idsmall_category: idsmall,
        name: req.body['catName' + idsmall],
        idcategory: parseInt(req.params.id)
    }
    console.log(cat);
    const result = SmallCat.updateByEntity(cat);
    res.redirect('/management/categories/' + req.params.id);
})

module.exports = router;