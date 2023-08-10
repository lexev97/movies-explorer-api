const Movie = require('../models/movie');
const { CREATED } = require('../errors/statusCodes');
const NotFoundError = require('../errors/NotFoundError');
const RestrictedError = require('../errors/RestrictedError');

// Returns all movies saved by current user
module.exports.getSavedMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

// Creates movie with params passed in body:
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch(next);
};

// Removes saved movie by id
module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie && (movie.owner.toString() === req.user._id)) {
        return Movie.findByIdAndRemove(movie._id);
      }
      if (movie && (movie.owner.toString() !== req.user._id)) {
        throw new RestrictedError('Пользователь может удалять только свои фильмы');
      }
      throw new NotFoundError('Передан несуществующий _id фильма');
    })
    .then((mov) => res.send({ data: mov }))
    .catch(next);
};
