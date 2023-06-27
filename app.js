const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const cors = require('cors');

// Routes
const blogRoutes = require('./routes/Blog');

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));

// Database Connection
mongoose
  .connect(process.env.SOURCE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

//endpoints 
app.use('/blogs', blogRoutes); // Assuming '/blog' as the base URL for the Blog routes




