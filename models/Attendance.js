// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  staff: { type: String, required: true },
  day: { type: Date, required: true },
  schedule: { type: Date, required: true },
  timeIn: { type: String, required: true },
  timeOut: { type: String, required: true },
  mealIn: { type: String, required: true },
  mealOut: { type: String, required: true },
  overtimeIn: { type: String, required: true },
  overtimeOut: { type: String, required: true },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
