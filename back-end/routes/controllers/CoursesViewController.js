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
const Teachers = require('../models/Teachers');
const EnrolledCourses = require('../models/EnrolledCourses');
const Small_Categories = require('../models/Small_Categories');
const FavoriteCourses = require('../models/FavoriteCourses');

router.get('/catID=:id', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    let type = 0;
    if (req.isAuthenticated()) {
        username = req.user.username;
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    const currentCat = await cat.getById(req.params.id);
    const allScat = await smallcat.getByCatId(req.params.id);
    let courses = [];
    for (let c of allScat) {
        let cour = await Courses.getByCatID(c.idsmall_category);
        courses = courses.concat(cour);
    }
    res.render('coursesViewByCat', {
        title: 'Online Academy - ' + currentCat.name,
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: username,
        courses: courses,
        category: currentCat.name,
        layout: 'main'
    });
});

router.get('/smallcatID=:scatid', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    let type = 0;
    if (req.isAuthenticated()) {
        username = req.user.username;
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    let currentCat = await smallcat.getById(req.params.scatid);
    currentCat.count = currentCat.count + 1;
    const rs = await smallcat.updateByEntity(currentCat);
    let course = await Courses.getByCatID(req.params.scatid);
    res.render('coursesViewByCat', {
        title: 'Online Academy - ' + currentCat.name,
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: username,
        category: currentCat.name,
        courses: course,
        layout: 'main'
    });
});

router.get('/detail/courseid=:id', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    let type = 0;
    let isEnroll = false;
    let isFavor = false;
    if (req.isAuthenticated()) {
        username = req.user.username;
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else {
            type = 1;
            isEnroll = await EnrolledCourses.getByTwoID(req.user.iduser, req.params.id);
            isFavor = await FavoriteCourses.getByTwoID(req.user.iduser, req.params.id);
        }
    }
    let course = await Courses.getById(req.params.id);
    const category = await smallcat.getById(course.idsmall_category);
    const smallcategory = category.name;
    const instructor = await Teachers.getById(course.teacher);
    course.views = course.views + 1;
    const rs = await Courses.updateByEntity(course);
    res.render('coursesDetail', {
        title: course.name,
        cats: cats,
        smallcats: smallcats,
        smallcategory: smallcategory,
        type: type,
        username: username,
        course: course,
        teacher: instructor,
        isEnroll: isEnroll,
        isFavor: isFavor,
        layout: 'main'
    });
});

router.get('/searchResult', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    let username = null;
    let type = 0;
    if (req.isAuthenticated()) {
        username = req.user.username;
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    let message1 = null,
        message2 = null;

    const catCommon = await Small_Categories.getByTextSearch(req.query.keyword);
    const coursesCommon = await Courses.getByTextSearch(req.query.keyword);
    if (!coursesCommon)
        message1 = 'Not found "' + req.query.keyword + '" course. Switch to categories tab if you search for categories';
    if (!catCommon)
        message2 = 'Not found "' + req.query.keyword + '" category. Switch to courses tab if you search for courses';
    res.render('searchView', {
        title: 'Online Academy - Search Result',
        cats: cats,
        smallcats: smallcats,
        type: type,
        username: username,
        keyword: req.query.keyword,
        courses: coursesCommon,
        CommonCategory: catCommon,
        message1: message1,
        message2: message2,
        layout: 'main'
    });
});

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