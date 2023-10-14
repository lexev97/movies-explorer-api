const cors = require('cors');

const corsHandler = cors({
  origin: [
    'https://ypdiploma.nomoreparties.co',
    'http://ypdiploma.nomoreparties.co',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
});

module.exports = { corsHandler };
