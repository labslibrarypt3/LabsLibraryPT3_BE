require('dotenv').config();
const server = require('./api/server.js');

PORT = process.env.PORT || 9001;

server.listen(PORT, () => {
    console.log(`BEEP BOOP I am a server, listening on PORT ${PORT}`)
});