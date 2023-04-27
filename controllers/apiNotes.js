const express = require("express");
const router = express.Router();
const util = require("util");
const fs = require("fs");
const uuid = require("uuid");


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
        id: uuid.v4(),
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


router.delete("/:id", (req, res) => {
    const noteID = req.params.id;
    let objDelete
    readFilePromise(database, "utf-8").then(data => { 
        const dataArr = JSON.parse(data);
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].id === noteID) { 
                objDelete = dataArr[i];
                dataArr.splice(i, 1);
                // return res.json({deleted: objDelete, newArr: dataArr});
                return writeFilePromise(database, JSON.stringify(dataArr, null, 4))
            } else {
                objDelete = {msg: `Could not find note ${noteID}`}
            }
        };
    }).then(() => {
        return res.json(objDelete)
    }).catch(err => {
        return res.status(500).json({msg: "Error reading/writing database", err});
    });

})

module.exports = router;