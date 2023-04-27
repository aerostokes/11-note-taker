const express = require("express");
const router = express.Router();
const util = require("util");
const fs = require("fs");

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const database = "./db/db.json";

router.get("/", (req, res) => {
    readFilePromise(database, "utf-8").then(data => {
        return res.json(JSON.parse(data));
    }).catch(err => {
        return res.status(500).json({msg: "Error reading database", err});
    });
});

router.post("/", (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
    };
    readFilePromise(database, "utf-8").then(data => { 
        const dataArr = JSON.parse(data);
        dataArr.push(newNote);
        return writeFilePromise(database, JSON.stringify(dataArr, null, 4))
    }).then(() => {
        return res.json(newNote)
    }).catch(err => {
        return res.status(500).json({msg: "Error reading/writing database", err});
    });
});


module.exports = router;