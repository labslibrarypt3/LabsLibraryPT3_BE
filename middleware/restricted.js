//this verifies the oauth access token
module.exports = {
  restricted
};

function restricted(req, res, next) {
  //get auth header value
  const authorizationToken = req.headers["authorization"];
  //check if auth header is undefined
  if (typeof authorizationToken !== "undefined") {
    //set token
    req.token = authorizationToken;
    //pass baton to next middleware
    next();
  } else {
    res.sendStatus(403).json({ error: "forbidden" });
  }
}
