const express = require('express');
const multer = require('multer');
const router = express.Router();
const Student = require('../model/students.model');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/dist/assets/images');
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        }
        else{
            var originalname = file.originalname;
            var extension = originalname.split(".");
            filename = Date.now() + '.' + extension[extension.length-1];
            cb(null, filename);
        }

    }
});

var upload = multer({storage: storage, dest: 'client/dist/assets/images'}).single('student_pix');

router.get('/', function (req, res) {
    Student.find(function (err, student) {
        if (err) {
            res.status(500).send(err);
        }
        else{
            if (student === null) {
                res.send('No student reqistered yet ...');
            }
            else{
                res.json({
                    success: true,
                    student : student
                });
            }
        }

    });
});

router.get('/:id', function (req, res) {
    Student.findOne({_id: req.params.id},function (err, student) {
        if (err) {
            res.status(500).send(err);
        }
        else{
            if (!student) {
                res.send('No student reqistered yet ...');
            }
            else{
                res.json({
                    success: true,
                    student : student
                });
            }
        }

    });
});

router.post('/', function(req, res){
    upload(req, res, function(err) {
        if (err) {
            if (err.code === 'filetype') {
                res.json({success: false, message: 'file type invalid...file type must be either .jpg, .jpeg or .png'});
            }
            else {
                console.log(err);
                res.json({success: false, message: 'file was not uploaded'});
            }
        }
        else {
            if (!req.file) {
                res.json({success: false, message: 'no file was selected'});
            }
            else {
                var firstname = req.body.firstname;
                var lastname = req.body.lastname;
                var age = req.body.age;
                var gender = req.body.gender;
                var studentClass = req.body.studentClass;
                var student_pix = req.file.filename;

                var newStudent = new Student({
                    firstname: firstname,
                    lastname: lastname,
                    age: age,
                    gender: gender,
                    studentClass: studentClass,
                    student_pix: student_pix
                });

                newStudent.save(function(err){
                    if (err){
                        res.status(500).send(err);
                    }
                    else{
                        res.send({
                            success: true
                        });
                    }
                });
            }
        }
    });
});

router.put('/:id', function(req, res){
    Student.findOne({_id: req.params.id}, function(err, student){
        if (err){
            res.status(500).send(err);
        }
        else{
            if (!student) {
                res.send({
                    success: false,
                    error: 'Student not fond ...'
                });
            }
            else{
                    student.firstname = req.body.firstname;
                    student.lastname = req.body.lastname;
                    student.age = req.body.age;
                    student.gender = req.body.gender;
                    student.studentClass = req.body.studentClass;

                    student.save(function(err) {
                        if (err){
                            res.status(500).send(err);
                        }
                        else{
                            res.send({
                                success: true
                            });
                        }
                    });
            }
        }

    });
});

router.delete('/:id', function(req, res) {
    Student.findOne({_id: req.params.id}, function(err, student){
        if (err){
            res.status(500).send(err);
        }
        else{
            if (!student){
                res.send({
                    success: false,
                    error: 'student not found ...'
                });
            }
            else{
                student.remove(function(err){
                    if (err){
                        res.status(500).send(err);
                    }
                });
            }
        }
    });
});

module.exports = router;