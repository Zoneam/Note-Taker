const express = require("express");
const fs = require("fs");
const uniqid = require("uniqid");
const router = express.Router();
const path = require("path");


router.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '../db/db.json')));

router.post('/api/notes',(req,res) => {
  let newNote = req.body;
  let newId = uniqid();
  newNote.id = newId;
  fs.readFile(path.join(__dirname, '../db/db.json'),(err,data) => {
    if (err) throw err;
    let dbFile = JSON.parse(data);
    dbFile.push(newNote);
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(dbFile), 'utf-8', err => {
      if (err) throw err;
      console.log("Note has been posted")
    })
  })
  res.redirect('/notes');
})

router.delete('/api/notes/:id', (req,res)=> {
  let i = 0 ;
  let db =  fs.readFileSync(path.join(__dirname, '../db/db.json'));
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
  
fs.writeFileSync(path.join(__dirname, '../db/db.json'),JSON.stringify(dbFile));
res.sendStatus(200);
})

module.exports = router;