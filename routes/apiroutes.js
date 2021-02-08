const fs = require('fs')
const noteData = require('../db/db.json')
const router = require("express").Router();

router.get("/notes", function (req, res) {
    res.json(noteData);
});

router.post("/notes", function (req, res) {
    if (noteData.length === 0){
        req.body.id = 0
    } else {
        req.body.id = noteData.length
    }
    noteData.push(req.body)
    updateDb(noteData)
    res.json(req.body)
})

function updateDb(notes) {
    notes = JSON.stringify(notes)
    fs.writeFileSync('db/db.json', notes, err => {
        if (err) throw err
    })
}

router.delete("/notes/:id", function(req, res) {
    for(var i = 0; i < noteData.length; i++){
        if(noteData[i].id === parseInt(req.params.id)){
            noteData.splice(i,1)
            updateDb(noteData)
        }
    }
    return res.send();
})

module.exports = router;