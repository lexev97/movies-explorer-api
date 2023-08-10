require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsHandler } = require('./middlewares/cors');

const NotFoundError = require('./errors/NotFoundError');
const { BAD_REQUEST, CONFLICT, SERVER_ERROR } = require('./errors/statusCodes');

const { PORT = 5000, MONGOOSE_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();
mongoose.connect(MONGOOSE_DB);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(corsHandler);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err.code === 11000) {
    res.status(CONFLICT).send({ message: 'Такой email уже зарегистрирован' });
    return;
  }

  res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT);
