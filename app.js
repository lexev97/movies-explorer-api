require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { corsHandler } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const errorHandler = require('./middlewares/errorHandler');
const { MONGOOSE_DB } = require('./constants/constants');

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect(MONGOOSE_DB);

app.use(corsHandler);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/', limiter, require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
