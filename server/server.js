// Import required modules
require('dotenv').config(); // Load environment variables from a .env file
const express = require('express');
const app = express();

// Configure Express middleware
app.use(express.json()); // Parse request bodies as JSON

// Connect to MongoDB using Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('Database Connected'))
  .catch(err => console.log('Error connecting to database:\n' + err));
const db = mongoose.connection;

// Enable CORS 
const cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true, // Allow sending and receiving cookies across domains
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Import and use routers
const instructorsRouter = require('./routes/instructors.js');
const studentsRouter = require('./routes/students.js');
const lessonsRouter = require('./routes/lessons.js');
const availableRouter = require('./routes/available.js');
const scheduleRouter = require('./routes/schedule.js');
const usersRouter = require('./routes/users.js');
const resetRouter = require('./routes/reset.js');

app.use('/instructors', instructorsRouter); // instructors router at '/instructors' path
app.use('/students', studentsRouter); // students router at '/students' path
app.use('/lessons', lessonsRouter); // lessons router at '/lessons' path
app.use('/available', availableRouter); // available router at '/available' path
app.use('/schedule', scheduleRouter); // schedule router at '/schedule' path
app.use('/users', usersRouter); // users router at '/users' path
app.use('/reset', resetRouter); // users router at '/users' path

// Start the server
app.listen(5000, () => console.log('Server is up'));
