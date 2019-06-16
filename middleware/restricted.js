//this verifies the oauth access token
// axios.get(`url`,
//{headers: { authorization: token }} <- pass in this object for every axios call as the second argument
//)

const restricted = async (req, res, next) => {
  console.log("Moving to a restricted route");
  try {
    //check if auth header is undefined
    if (typeof req.headers.authorization !== "undefined") {
      req.token = req.headers.authorization;
      next();
      //pass baton to next middleware
    } else {
      res.sendStatus(403).json({ error: "forbidden" });
    }
  } catch (error) {
    res.status(500);
  }
};
module.exports = restricted;
