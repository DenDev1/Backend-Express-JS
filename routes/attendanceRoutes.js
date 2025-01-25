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
// Update attendance record by 'staff'
router.put('/update/:staff', async (req, res) => {
  try {
    const { staff } = req.params; // Get the 'staff' parameter from the URL
    const updatedData = req.body; // Get the updated data from the request body

    // Update the attendance record by matching the 'staff' field
    const result = await Attendance.findOneAndUpdate({ staff }, updatedData, { new: true });

    if (!result) {
      return res.status(404).send({ message: `Attendance record for staff '${staff}' not found.` });
    }

    res.status(200).send(result); // Send the updated record as the response
  } catch (error) {
    res.status(500).send({ message: 'Failed to update attendance.', error });
  }
});

module.exports = router;
