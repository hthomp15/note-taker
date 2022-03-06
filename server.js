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

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string'){
        return false;
    }
    if (!note.text || typeof note.text !== 'string'){
        return false;
    }
    if (!note.id || typeof note.id !== 'string'){
        return false;
    };
    return true;
}

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    req.body.id = uniqid()
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    } else {
        const note = createNote(req.body, notes)
        res.json(note);
    }
});

app.listen(3001, () => {
    console.log('API server on PORT 3001')
})