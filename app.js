require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const router = require('./routes/index');

const { PORT = 3000, MONGOOSE_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();
mongoose.connect(MONGOOSE_DB);

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen(PORT);