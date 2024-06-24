function mymiddlware(req, res, next) {
  console.log("First custom middleware");
  next();
}



module.exports = mymiddlware