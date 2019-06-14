//this verifies the oauth access token

  
  // axios.get(`url`,
  //{headers: { authorization: token }} <- pass in this object for every axios call as the second argument
  //)
  
  const restricted = async (req, res, next) => {
    //get auth header value

    console.log('got to this point')
    console.log(req.headers,'progress')
    const authToken = req.headers.authorization;
    try{
    //check if auth header is undefined
    if (typeof authToken !== "undefined") {
      console.log('verified')
      req.token = authToken;
      next();
      //pass baton to next middleware
    } else {
      res.sendStatus(403).json({ error: "forbidden" });
    }
}catch(error){
    res.status(500)
}
  }
  module.exports = restricted
