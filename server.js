const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid")
const PORT = process.env.PORT||3000;
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

app.post('/api/notes',(req,res) => {
  let newNote = req.body;
  let newId = uniqid();
  newNote.id = newId;
  fs.readFile('./db/db.json',(err,data) => {
    if (err) throw err
    let dbFile = JSON.parse(data);
    dbFile.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(dbFile), 'utf-8', err => {
      if (err) throw err;
      console.log("Note has been posted")
    })
  })
  res.redirect('/notes');
})

app.delete('/api/notes/:id', (req,res)=> {
  let i = 0 ;
  let db =  fs.readFileSync(path.join(__dirname, './db/db.json'));
  let dbFile = JSON.parse(db);
  let noteId = req.params.id;

    dbFile.forEach((dbItem) => {
      if (dbItem.id.toString() === noteId){
        dbFile.splice(i,1);
        console.log('noteId',noteId)
        return;
      }
    i++;
  })
  
fs.writeFileSync(path.join(__dirname, './db/db.json'),JSON.stringify(dbFile));
res.sendStatus(200);
})

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));