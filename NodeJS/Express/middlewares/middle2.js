function secondMiddleware(req, res, next) {
  console.log("Second custom middleware");
  next();
}


module.exports = secondMiddleware