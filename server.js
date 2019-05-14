const express = require('express');
const server = express();


server.get('/', (req, res) => {
    res.send('Hello World, from Neighborhood Library Backend');
});



module.exports = server;