const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

//this verifies the oauth access token
// axios.get(`url`,
//{headers: { authorization: token }} <- pass in this object for every axios call as the second argument
//)

const restricted = function(req, res, next) {
  const token = req.headers.authorization;
  if (!token || token === null) {
    res.redirect(`${baseUrl}/account`);
  } else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        res.redirect("/");
      } else {
        req.email = decoded.email;
        req.userId = decoded.userId;
        if (req.userId) {
          next();
        } else {
          res.redirect("/");
        }
      }
    });
  }

  // err?res.status(401).json({"message":"authorization denied"}):

  // res.status(500).json({message:'Server Error try relogging'})

  //check if auth header is undefined
  //   if (typeof req.headers.authorization !== "undefined") {
  //     req.token = req.headers.authorization;
  //     next();
  //     //pass baton to next middleware
  //   } else {
  //     res.sendStatus(403).json({ error: "forbidden" });
  //   }
  // } catch (error) {
  //   res.status(500);
  // }
};
module.exports = restricted;
