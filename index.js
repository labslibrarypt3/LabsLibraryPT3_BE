require('dotenv').config();
const server = require('./server.js');
const knex = require('knex');
const knexConfig = require('./knexfile');
const userDB = knex(knexConfig.development)

PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
    console.log(`BEEP BOOP I am a server, listening on PORT ${PORT}`)
});