// server.js or app.js (Node.js with Express)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define Attendance schema and model
const attendanceSchema = new mongoose.Schema({
  staff: String,
  day: Date,
  schedule: Date,
  timeIn: Date,
  timeOut: Date,
  overtimeIn: Date,
  overtimeOut: Date,
  mealIn: Date,
  mealOut: Date
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// POST route to save attendance data
app.post('/api/attendance', (req, res) => {
  const newAttendance = new Attendance(req.body);
  newAttendance.save()
    .then((attendance) => {
      res.status(201).json(attendance);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error saving attendance', error });
    });
});
// PUT route to update attendance data by 'staff'
app.put('/api/attendance/update/:staff', async (req, res) => {
  try {
    const { staff } = req.params; // Extract 'staff' from the route parameter
    const updatedData = req.body; // Get the updated data from the request body

    // Find and update the record based on the 'staff' field
    const result = await Attendance.findOneAndUpdate({ staff }, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({ message: `Attendance record for staff '${staff}' not found.` });
    }

    res.status(200).json(result); // Send the updated record as the response
  } catch (error) {
    res.status(500).json({ message: 'Failed to update attendance', error });
  }
});
app.delete('/api/attendance/:staff', (req, res) => {
  const { staff } = req.params;
  console.log(`Deleting attendance records for staff: ${staff}`); // Log staff identifier

  Attendance.deleteMany({ staff })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No attendance records found for the specified staff.' });
      }
      res.status(200).json({ message: 'Attendance records deleted successfully.', result });
    })
    .catch((error) => {
      console.error('Error deleting attendance records:', error);
      res.status(500).json({ message: 'Failed to delete the record. Please try again later.', error });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});