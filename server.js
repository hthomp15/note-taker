const express = require('express');
const fs = require('fs');
const uniqid = require('uniqid');
const app = express();
const { notes } = require('./Develop/db/db.json')

const id = uniqid();

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.listen(3001, () => {
    console.log('API server on PORT 3001')
})