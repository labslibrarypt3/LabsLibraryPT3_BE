const jwt = require("jsonwebtoken")

//this verifies the oauth access token
// axios.get(`url`,
//{headers: { authorization: token }} <- pass in this object for every axios call as the second argument
//)

const restricted = function (req, res, next){ 
  const token =req.headers.authorization
  console.log(token)
  // const token =
  // req.body.authorization ||
  // req.query.authorization ||
  // req.headers.authorization ||
  // req.cookies.authorization;
  
    if(!token){
      
      res.status(401).send(path.resolve('http://localhost:4000/'));
  }else{
   
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      
      if(err){
        res.status(401).redirect('http://localhost:3000/');
      }else{
      req.email = decoded.email;
      req.userId = decoded.userId;
      
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
