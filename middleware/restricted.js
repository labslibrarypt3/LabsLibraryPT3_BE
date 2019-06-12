function restricted(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "You are not logged in" });
  }
}
