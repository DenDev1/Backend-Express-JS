const express = require('express');
const Attendance = require('../models/Attendance');
const router = express.Router();

// POST endpoint to create attendance
router.post('/', async (req, res) => {
  const { staff, day, schedule, timeIn, timeOut, mealIn, mealOut, overtimeIn, overtimeOut } = req.body;

  try {
    // Create a new attendance record
    const newAttendance = new Attendance({
      staff,
      day,
      schedule,
      timeIn,
      timeOut,
      mealIn,
      mealOut,
      overtimeIn,
      overtimeOut
    });

    // Save to database
    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance); // Return the saved record as response
  } catch (error) {
    res.status(500).json({ message: 'Error saving attendance', error });
  }
});

module.exports = router;
