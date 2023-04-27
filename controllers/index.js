const express = require("express");
const router = express.Router();
const path = require("path");

const apiNotes = require("./apiNotes");
router.use("/api/notes", apiNotes);

router.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;