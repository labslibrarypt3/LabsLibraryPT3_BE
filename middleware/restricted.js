const jwt = require("jsonwebtoken")

//this verifies the oauth access token
// axios.get(`url`,
//{headers: { authorization: token }} <- pass in this object for every axios call as the second argument
//)

const restricted = function (req, res, next){ 
console.log(req.headers.authorization,'im restricted :)')
  const token =req.headers.authorization
  // const token =
  // req.body.authorization ||
  // req.query.authorization ||
  // req.headers.authorization ||
  // req.cookies.authorization;
  
    if(!token){
      console.log(token, '401 :(')
      res.status(401).send('Unauthorized: no token provided');
  }else{
    console.log(token, 'verify?')
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      console.log(token, 'verified')
      if(err){
        console.log(token, ' 2nd 401 :(')
        res.status(401).send('Unauthorized: Invalid token')
      }else{
      console.log(token, 'made it here to end')
      req.email = decoded.email;
      req.userId = decoded.userId;
      console.log(req)
      next();
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
