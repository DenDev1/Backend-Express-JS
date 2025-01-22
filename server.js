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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
