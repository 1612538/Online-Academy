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
const FavoriteCourses = require('../models/FavoriteCourses');
const EnrolledCourses = require('../models/EnrolledCourses');

router.get('/FavoriteCourses', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    if (req.isAuthenticated()) {
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    const favorCourses = await FavoriteCourses.getByUserId(req.user.iduser);
    let rows = [];
    if (favorCourses != null)
        for (let favorCourse of favorCourses)
            rows = rows.concat(await Courses.getById(favorCourse.idcourses));
    res.render('coursesViewByCat', {
        title: 'Online Academy - Favorite Course',
        cats: cats,
        smallcats: smallcats,
        type: type,
        courses: rows,
        username: req.user.username,
        isFavorite: true,
        category: 'Favorite Courses',
        layout: 'main',
    });
});

router.get('/EnrolledCourses', async(req, res) => {
    const cats = await cat.all();
    let smallcats = await smallcat.all();
    if (req.isAuthenticated()) {
        if (req.user.type === 3)
            type = 3;
        else if (req.user.type === 2)
            type = 2;
        else type = 1;
    }
    const enrollCourses = await EnrolledCourses.getByUserId(req.user.iduser);
    let rows = [];
    if (enrollCourses != null)
        for (let enrollCourse of enrollCourses)
            rows = rows.concat(await Courses.getById(enrollCourse.idcourses));
    res.render('coursesViewByCat', {
        title: 'Online Academy - Favorite Course',
        cats: cats,
        smallcats: smallcats,
        type: type,
        courses: rows,
        username: req.user.username,
        category: 'Enrolled Courses',
        layout: 'main',
    });
});

router.post('/addFavorite/idcourses=:id', async(req, res) => {
    const newFavorite = {
        iduser: req.user.iduser,
        idcourses: req.params.id,
    }
    const rs = await FavoriteCourses.add(newFavorite);
    res.redirect('/detail/courseid=' + req.params.id);
});

router.post('/addEnrolled/idcourses=:id', async(req, res) => {
    const newEnrolled = {
        iduser: req.user.iduser,
        idcourses: req.params.id,
    }
    let course = await Courses.getById(req.params.id);
    course.subscribes = course.subscribes + 1;
    const rows = await Courses.updateByEntity(course);
    const rs = await EnrolledCourses.add(newEnrolled);
    res.redirect('/detail/courseid=' + req.params.id);
});

router.post('/deleteFavorite/idcourses=:id', async(req, res) => {
    if (req.user.type === 1) {
        let rs = await FavoriteCourses.deleteById(req.user.iduser, req.params.id);
    }
    res.redirect('/user/FavoriteCourses');
});

module.exports = router;