//dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

//set up express
const app = express();
const PORT = process.env.PORT || 3000;

//empty array for data
let notes = [];

//set up express for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log("notes page")
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    console.log("home page");
});

app.get('api/notes', (req, res) => res.json(notes));

app.get('/api/notes', (req, res) => {
    console.log("get notes");

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log(JSON.stringify(data));
    res.json(data);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));