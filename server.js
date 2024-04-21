// Import necessary modules and dependencies
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set up express 
const app = express();

// Start the server
const PORT = process.env.PORT || 3001;


// Middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`You are now running on port ${PORT}!`);
  });
});
