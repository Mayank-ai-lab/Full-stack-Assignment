const Classroom = require('../models/Classroom');
const User = require('../models/User');

const createClassroom = async (req, res) => {
  const { name, schedule } = req.body;

  try {
    const newClassroom = new Classroom({
      name,
      schedule,
    });

    const classroom = await newClassroom.save();
    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const assignTeacher = async (req, res) => {
  const { teacherId, classroomId } = req.body;

  try {
    let classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ msg: 'Classroom not found' });
    }

    classroom.teacher = teacherId;
    await classroom.save();

    const teacher = await User.findById(teacherId);
    teacher.classroom = classroomId;
    await teacher.save();

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const assignStudent = async (req, res) => {
  const { studentId, classroomId } = req.body;

  try {
    let classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ msg: 'Classroom not found' });
    }

    classroom.students.push(studentId);
    await classroom.save();

    const student = await User.findById(studentId);
    student.classroom = classroomId;
    await student.save();

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createTimetable = async (req, res) => {
  const { timetable } = req.body;
  const classroomId = req.user.classroom;

  try {
    let classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).json({ msg: 'Classroom not found' });
    }

    classroom.timetable = timetable;
    await classroom.save();

    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createClassroom,
  assignTeacher,
  assignStudent,
  createTimetable,
};
