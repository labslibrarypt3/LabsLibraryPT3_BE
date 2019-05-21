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

// get a list of users
server.get('/list', async (req, res) => {
    try {
      const user = await userDB.get(req.query);
      res.status(200).json(user);
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Users',
      });
    }
  })
//POST
server.post('/add', async (req,res) => {
  console.log(req.body)
  const enter = req.body
    try {
      const user = await userDB.insert(enter);
      res.status(201).json(user);
    } catch (error) {
      // log error to database
      res.status(500).json({
        message: 'Error adding the User',
      });
    }
  });
module.exports = server;