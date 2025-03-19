require('dotenv').config();  // This line should be the first in the file!
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware setup
app.use(cors())
app.use(express.json());  // Parses incoming JSON requests
app.use(cookieParser());  // Parses cookies in requests

// MongoDB URI from environment
const URI = process.env.MONGODB_URL;
console.log('MongoDB URI:', URI);  // Log the URI for debugging

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/user', require('./routes/useRouter'));  // Assuming routes are defined in `useRouter.js`
// app.use('/api',require('./routes/categoryRouter'))
app.use('/api', require('./routes/categoryRouter'));  // Assuming routes are defined in `categoryRouter.js`
app.use('/api',require('./routes/productRouter'))

// Basic Test Route
app.get('/', (req, res) => {
  res.json({ msg: "This is the home route" });
});

// Error-handling middleware (placed after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
