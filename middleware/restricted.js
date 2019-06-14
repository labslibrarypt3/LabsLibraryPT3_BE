//this verifies the oauth access token
module.exports = {
  restricted
};

// axios.get(`url`,
//{headers: { authorization: token }} <- pass in this object for every axios call as the second argument
//)

function restricted(req, res, next) {
  //get auth header value
  const authToken = req.headers["authorization"];
  //check if auth header is undefined
  if (typeof authToken !== "undefined") {
    //set token
    req.token = authToken;
    //pass baton to next middleware
    next();
  } else {
    res.sendStatus(403).json({ error: "forbidden" });
  }
}
