
const express = require('express');
const router = express.Router();
const db = require('../../DATA/helpers/usersDb');

router.post('/callback',(req, res, next) => {
    console.log(req.body)
    
    res.status(200).json(req.body);
})
    
module.exports = router;