// Import and initialize packages, modules, and variables
const express = require("express");
const router = express.Router();
const path = require("path");
const apiNotes = require("./apiNotes");

// Call modularized routes
router.use("/api/notes", apiNotes);

// GET notes.html
router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

// GET wildcard route for landing page
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export module
module.exports = router;