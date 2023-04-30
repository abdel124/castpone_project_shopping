const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("hello")
  console.log(req.cookies.access_token)
  if (!token) return next(createError.createError(401, "You are not authenticated!"));

  jwt.verify(token, "Hello", (err, user) => {
    if (err) return next(createError.createError(403, "Token is not valid!"));
    req.user = user;
    next()
  });
};

module.exports = {
  verifyToken
};