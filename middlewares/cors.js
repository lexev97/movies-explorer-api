const allowedCors = [
  'https://ypdiploma.nomoreparties.co',
  'http://ypdiploma.nomoreparties.co',
  'https://ypdiploma.nomoreparties.co/',
  'http://ypdiploma.nomoreparties.co/',
  'http://localhost:3000',
];

const corsHandler = (req, res, next) => {
  const { referer } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(referer)) {
    res.header('Access-Control-Allow-Origin', referer);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }

  return next();
};

module.exports = { corsHandler };
