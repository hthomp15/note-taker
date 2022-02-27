const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

const { notes } = require('./Develop/db/db.json')

const id = uniqid();

function createNote(body, noteArray) {
    console.log(body);
    noteArray.push(body)
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify( { notes: noteArray }, null, 2)
    )
    return body;
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    req.body.id = uniqid()
    console.log(req.body);

    const note = createNote(req.body, notes)
    res.json(note);
})

app.listen(3001, () => {
    console.log('API server on PORT 3001')
})