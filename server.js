require('dotenv').config();  // Ensure this is at the top
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Allowed Origins for CORS - Make sure this matches your frontend origin
const allowedOrigins = ['http://localhost:5173', 'https://modern-shop-shivangi.netlify.app']; // Add your production URL here

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);  // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,  // Allow credentials (cookies, Authorization headers)
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());  // Parses incoming JSON requests
app.use(cookieParser());  // Parses cookies in requests

// MongoDB URI from environment
const URI = process.env.MONGODB_URL;
console.log('MongoDB URI:', URI);  // Log the URI for debugging (remove in production)

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
app.use('/api', require('./routes/categoryRouter'));  // Assuming routes are defined in `categoryRouter.js`
app.use('/api', require('./routes/productRouter')); // Assuming routes are defined in `productRouter.js`

// Basic Test Route
app.get('/', (req, res) => {
  res.json({ msg: "This is the home route" });
});

// Error-handling middleware (placed after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS policy violation' });
  }
  res.status(500).send('Something went wrong!');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
