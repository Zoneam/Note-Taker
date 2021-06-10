const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT||3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));


app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));
app.get('/api/notes', (req, res) => res.json(noteDB));

app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));