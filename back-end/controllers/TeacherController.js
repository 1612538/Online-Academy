const express = require('express');
const router = express.Router();
const Cat = require('../models/Categories');
const SmallCat = require('../models/Small_Categories');
const bodyParser = require('body-parser');
const Admin = require('../models/Admins');
const User = require('../models/Users');
const Teacher = require('../models/Teachers');
const bcrypt = require('../utils/bcrypt');

router.get('/', async(req, res) => {
    const teachers = await Teacher.all();
    const cats = await Cat.all();
    const smallcats = await SmallCat.all();
    res.render('admin_teacher', {
        title: 'Management - Teacher',
        cats: cats,
        smallcats: smallcats,
        teachers: teachers,
        message: req.query.message,
        layout: 'admin'
    });
})

router.post('/addTeacher/', async(req, res) => {
    const teacher = {
        username: req.body.teacherNameNew,
        password: req.body.teacherPasswordNew,
        firstname: req.body.teacherFirstNew,
        lastname: req.body.teacherLastNew,
        workplace: req.body.teacherWorkNew,
        email: req.body.teacherEmailNew,
        isBlocked: 0,
    }
    const user = await User.getByUsername(teacher.username);
    const admin = await Admin.getByUsername(teacher.username);
    const teach = await Teacher.getByUsername(teacher.username);
    let teacherID;
    if (user != null || admin != null || teach != null) {
        res.redirect('/management/teachers/?message=Username has been already used.');
        return;
    } else {
        teacher.password = await bcrypt.hashPassword(teacher.password);
        teacherID = await Teacher.add(teacher);
        res.redirect('/management/teachers');
        return;
    }
})

router.post('/deleteTeacher/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    const teacher = await Teacher.deleteById(id);
    return res.redirect('/management/teachers');
});

router.post('/updateTeacher/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    const teacher = {
        idteacher: id,
        username: req.body['teacherName' + id],
        password: req.body['teacherPassword' + id],
        firstname: req.body['teacherFirst' + id],
        lastname: req.body['teacherLast' + id],
        workplace: req.body['teacherWork' + id],
        email: req.body['teacherEmail' + id],
    }
    const result = Teacher.updateByEntity(teacher);
    return res.redirect('/management/teachers');
});

router.post('/lockTeacher/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    let teacher = await Teacher.getById(id);
    if (teacher.isBlocked === 0) {
        teacher.isBlocked = 1;
        let rs = await Teacher.updateByEntity(teacher);
    }
    res.redirect('/management/teachers');
});

router.post('/unlockTeacher/:id', async(req, res) => {
    let id = parseInt(req.params.id);
    let teacher = await Teacher.getById(id);
    if (teacher.isBlocked === 1) {
        teacher.isBlocked = 0;
        let rs = await Teacher.updateByEntity(teacher);
    }

    res.redirect('/management/teachers');
})


module.exports = router;