const { del } = require("express/lib/application");
const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');
const id = uniqid()

function createNote(body, noteArray) {
    console.log(body);
    noteArray.push(body)
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify( { notes: noteArray }, null, 2)
    )
    return body;
}

function deleteNote(id, noteArray) {
    if (id === noteArray.id) {
        del.noteArray.body
    } else {
        console.log('The note was not found')
    }
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


module.exports = {
    createNote,
    validateNote,
    deleteNote
}
