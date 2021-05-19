const express = require('express');
const router = express.Router();

const users = require('../models/Users');
const teachers = require('../models/Teachers');
const admins = require('../models/Admins');
const passport = require('../utils/passport');
const smallcat = require('../models/Small_Categories');
const cat = require('../models/Categories');
const bcrypt = require('../utils/bcrypt');
const Courses = require('../models/Courses');
const upload = require('../utils/multer');

router.get('/CreateCourse', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    if (req.isAuthenticated()) {
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }

    res.render('coursesCreate', {
        title: 'Online Academy - Create Course',
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: req.user.username,
        createSuccess: req.query.createSuccess,
        layout: 'main'
    });
}).post('/CreateCourse', upload.fields([
    { name: 'imageInput', maxCount: 1 },
    { name: 'slideInput', maxCount: 1 },
    { name: 'videoInput', maxCount: 1 }
]), async(req, res) => {
    const course = {
        name: req.body.nameInput,
        price: req.body.priceInput,
        idsmall_category: req.body.categoryInput,
        rate: 0,
        ratevotes: 0,
        teacher: req.user.idteacher,
        description1: req.body.briefDesc,
        description2: req.body.detailDesc,
        lastupdate: currentDate(),
        isCompleted: 0,
        img: '/tmp/my-uploads/' + req.files['imageInput'][0].filename,
        slidepreview: '/tmp/my-uploads/' + req.files['slideInput'][0].filename,
        subscribes: 0,
        previewvideo: '/tmp/my-uploads/' + req.files['videoInput'][0].filename,
        isBlocked: 0,
        views: 0,
    }
    const row = await Courses.add(course);
    return res.redirect('/teacher/CreateCourse?createSuccess=true');
})

router.get('/MyCourses', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    if (req.isAuthenticated()) {
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    const mycourses = await Courses.getByIdTeacher(req.user.idteacher);
    res.render('coursesViewByCat', {
        title: 'Online Academy - Create Course',
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: req.user.username,
        courses: mycourses,
        category: "My Courses",
        layout: 'main'
    });
})

function currentDate() {
    var date = new Date();
    var dateStr =
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2) + " " +
        ("00" + date.getDate()).slice(-2) + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        date.getFullYear();
    return dateStr;
}

module.exports = router;