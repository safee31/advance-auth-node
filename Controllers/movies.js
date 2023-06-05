const asyncHandler = require("../Helpers/asyncHandler");
const Movie = require("../Models/movies");

exports.getMovies = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const data = await Movie.find().limit(10);

  res.status(200).json({ data });
});
