const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    student_pix: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;