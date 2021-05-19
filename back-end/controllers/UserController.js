const express = require('express');
const router = express.Router();
const Cat = require('../models/Categories');
const SmallCat = require('../models/Small_Categories');
const bodyParser = require('body-parser');
const Admin = require('../models/Admins');
const User = require('../models/Users');
const Teacher = require('../models/Teachers');

router.get('/', async(req, res) => {
    const users = await User.all();
    const cats = await Cat.all();
    const smallcats = await SmallCat.all();
    res.render('admin_user', {
        title: 'Management - User',
        cats: cats,
        smallcats: smallcats,
        users: users,
        layout: 'admin'
    });
})

router.post('/deleteUser/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    const user = await User.deleteById(id);
    res.redirect('/management/users');
})

router.post('/lockUser/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    let user = await User.getById(id);
    if (user.isBlocked === 0) {
        user.isBlocked = 1;
        let rs = await User.updateByEntity(user);
    }
    res.redirect('/management/users');
});

router.post('/unlockUser/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    let user = await User.getById(id);
    if (user.isBlocked === 1) {
        user.isBlocked = 0;
        let rs = await User.updateByEntity(user);
    }

    res.redirect('/management/users');
})

module.exports = router;