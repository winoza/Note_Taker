const fs = require('fs')
const noteData = require('../db/db.json')


module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        res.json(noteData);
    });

    app.post("/api/notes", function (req, res) {

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

    app.delete("/api/notes/:id", function(req, res) {

        for(var i = 0; i < noteData.length; i++){
            if(noteData[i].id === parseInt(req.params.id)){
                noteData.splice(i,1)
                updateDb(noteData)
            }
        }

        return res.send();
    })
}