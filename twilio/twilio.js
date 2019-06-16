const express = require("express");
const router = express.Router();
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { chatToken } = require('./tokens');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

router.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

router.get('/chat/token', (req, res) => {
  const identity = req.query.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

router.post('/chat/token', (req, res) => {
  console.log(req);
  const identity = req.body.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
 
});

// app.get('/video/token', (req, res) => {
//   const identity = req.query.identity;
//   const room = req.query.room;
//   const token = videoToken(identity, room, config);
//   sendTokenResponse(token, res);
// });

// router.post('/video/token', (req, res) => {
//   const identity = req.body.identity;
//   const room = req.body.room;
//   const token = videoToken(identity, room, config);
//   sendTokenResponse(token, res);
// });

module.export = router;