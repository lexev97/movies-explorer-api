const cors = require('cors');

const corsOptions = {
  origin: [
    'https://ypdiploma.nomoreparties.co',
    'http://ypdiploma.nomoreparties.co',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};

const corsHandler = cors(corsOptions);

module.exports = { corsHandler };
