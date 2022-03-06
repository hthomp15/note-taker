const express = require('express');
const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiRoutes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);






app.listen(PORT, () => {
    console.log(`API server on PORT ${PORT}`)
})