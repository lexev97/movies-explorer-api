const User = require("../models/user");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "some-secret-key" } = process.env;
const { CREATED } = require("../errors/statusCodes");
const NotFoundError = require("../errors/NotFoundError");

// Returns user's info (email and name)
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

// User's info update (email and name)
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// Creates new user
module.exports.createUser = (req, res, next) => {
  const { email, name } = req.body;

  bycript
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
      })
    )
    .then((user) => {
      res.status(CREATED).send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(next);
};

// Returns JWT once email and password verified
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        dexpiresIn: "7d",
      });

      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          samesite: "strict",
        })
        .send({ message: "Авторизация прошла успешно!" });
    })
    .catch(next);
};

// Removes JWT from cookies once user signout
module.exports.logoutUser = (req, res, next) => {
  res.clearCookie("jwt").send({ message: "Сеанс завершен" });
};
