//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json',);

//set up express
const app = express();
const PORT = process.env.PORT || 3000;

//set up express for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json')); 
    res.json(notes);
    console.log("GET NOTES!")
});

app.post('/api/notes', (req, res) => {
  let newNote = req.body
  let notes = JSON.parse(fs.readFileSync('./db/db.json'));
  let notesLength = notes.length
  newNote.id = notesLength + 1

  notes.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
  console.log("Note created!")
});

app.delete('/api/notes/:id', (req, res) => {
    for (var j = 0; j < db.length; j++) {
        if (db[j].id == req.params.id) {
            db.splice(j, 1);
            break;
        };
    };
    fs.writeFileSync('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log("Note deleted!")
    });
    res.json(db);
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log("notes page")
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("home page");
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));