const express = require('express');
const {
  createClassroom,
  assignTeacher,
  assignStudent,
  createTimetable,
} = require('../controllers/classroomController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/create', auth('principal'), createClassroom);
router.post('/assign-teacher', auth('principal'), assignTeacher);
router.post('/assign-student', auth(['principal', 'teacher']), assignStudent);
router.post('/create-timetable', auth('teacher'), createTimetable);

module.exports = router;
