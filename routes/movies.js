const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { linkRegex } = require("../constants/constants");
const {
  getSavedMovies,
  addMovie,
  removeMovie,
} = require("../controllers/movies");

router.get("/", getSavedMovies);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().pattern(linkRegex).required(),
      trailer: Joi.string().pattern(linkRegex).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().pattern(linkRegex).required(),
      movieId: Joi.number().required(),
    }),
  }),
  addMovie
);
router.delete(
  "/:movieId",
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.number().required(),
    }),
  }),
  removeMovie
);
