require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, MONGOOSE_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();
mongoose.connect(MONGOOSE_DB);

app.use(express.json());



app.listen(PORT);