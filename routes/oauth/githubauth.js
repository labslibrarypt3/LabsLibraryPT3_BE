const express = require('express');
const request = require('superagent');


module.exports = (auth) => {

auth.get('/callback',(req, res, next) => {
   
      const { query } = req;
      const { code } = code;

      if (!code){
          return res.send({
              success: false,
              message: 'Error: no code',
          })
        
      }
      
      request
      .post(`http://github.com/login/oauth/access_token`)
      .send({
          client_id: '66d10ed2a42e30acdfcb',
          client_secret:'b78a4b174578404adddd85e5d7b620fd9713e109',
          code: code
      })
      .set('Accept','application/json')
      .then(function(result){
          const data = result.body;
          console.log(result)
          res.send(data);
      });
    });
};