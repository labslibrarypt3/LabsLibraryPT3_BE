const express = require('express');
const server = express();
const userDB = require('../DATA/helpers/usersDb');

server.use(express.json());

//GET
server.get('/', (req, res) => {
    res.send('Hello World, from Neighborhood Library Backend');
});

server.get('/account', (req, res) => {
    res.send('account page here');
});

server.get('/mybookshelf', (req, res) => {
    res.send('mybookshelf page here');
});

server.get('/books', (req, res) => {
    res.send('books page here');
});

server.get('/users', (req, res) => {
    res.send('users page here');
});

//POST
server.post('/users', (req, res) => {
    const user = req.body;
    // if(!user.firstName || !user.lastName || !user.email || !user.phoneNumber) {
    //     res.status(400).json({err:'must include required fields'})
    // }
    // else{
    userDB('Users').insert(user)
    .then(userData => {
        res.status(201).json(userData);
    })
    .catch(err => {
        res.status(500).json({err:'unable to post data'})
    })
    // };
});
module.exports = server;