//this verifies the oauth access token
module.exports = {
  restricted
};

function restricted(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //check if bearer header is undefined
  if (typeof bearerHeader !== "undefined") {
    //split bearer header value "Bearer __token_here__" at the space in the string
    const bearer = bearerHeader.split(" ");
    //split returns an array. get token from array
    const bearerToken = bearer[1];
    //set token
    req.token = bearerToken;
    //pass baton to next middleware
    next();
  } else {
    res.sendStatus(403).json({ error: "forbidden" });
  }
}
