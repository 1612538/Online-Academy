const express = require('express');
const router = express.Router();

const users = require('../models/Users');
const teachers = require('../models/Teachers');
const admins = require('../models/Admins');
const passport = require('../utils/passport');
const smallcat = require('../models/Small_Categories');
const cat = require('../models/Categories');
const bcrypt = require('../utils/bcrypt');

router.get('/', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    if (req.isAuthenticated() && req.user.type === 3) { //trả về true nếu đã đăng nhập rồi
        res.render('admin', {
            title: 'Online Academy - Management',
            cats: cats,
            smallcats: smallcats,
            layout: 'admin'
        })

    } else
        res.redirect('/');
});

module.exports = router;