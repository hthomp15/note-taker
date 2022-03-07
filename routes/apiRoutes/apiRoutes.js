
const router = require('express').Router();
const uniqid = require('uniqid');

const { validateNote, createNote, deleteNote } = require('../../lib/notes')
const { notes } = require('../../db/db.json')

const id = uniqid()

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    req.body.id = uniqid()
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    } else {
        const note = createNote(req.body, notes)
        res.json(note);
    }
});

router.get('/notes/:id', (req, res) => {
    const noteID = req.params.id

   const result = notes.filter(note => note.noteid === noteID); 
   return res.json(result)
})

router.delete('/notes/:id', (req, res) => {
    const { id } = request.params;
    const deletedNote = notes.find(note => note.id === id);
    
    if(!deletedNote) {
        res.status(404).send('The note cound not be deleted. The ID was not found.')
    } else {
        notes = notes.filter(note => note.id !== id);
        res.status(200).json(deleteNote)
    }
});

module.exports = router;
