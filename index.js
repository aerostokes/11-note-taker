// Import and initialize packages, modules, and variables
const express = require("express");
const app = express();
const controllers = require("./controllers");
const PORT = process.env.PORT || 3000;           


// Middleware to serve public folder and handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Call modularized routes
app.use(controllers);

// Listen
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

