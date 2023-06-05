const mongoose = require("mongoose");

const movieScheme = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true, strict: false }
);

const Movie = mongoose.model("Movie", movieScheme);

module.exports = Movie;
