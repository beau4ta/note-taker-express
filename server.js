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

app.post('/api/notes', (req, res) => {
    try {
        notes = fs.readFileSync('./db/db.json', "utf8");
        console.log(notes);

        notes = JSON.parse(notes);

        req.body.id = notes.length;
        notes.push(req.body);
        notes = JSON.stringify(notes);

        fs.writeFile('./db/db.json', notes, 'utf8', (err) => {
            if (err) throw err;
        });
        res.json(JSON.parse(notes));
        console.log("New note created!");

        fs.readFileSync('./db/db.json', 'utf8', (err) => {
            if (err) throw err;
        })
    } catch (err) {
        throw err;
    };
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

app.get('/api/notes', (req, res) => {
    res.json(db);
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log("notes page")
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("home page");
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));