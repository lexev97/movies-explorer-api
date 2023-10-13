const allowedCors = [
  'https://ypdiploma.nomoreparties.co',
  'http://ypdiploma.nomoreparties.co',
  'https://ypdiploma.nomoreparties.co/',
  'http://ypdiploma.nomoreparties.co/',
  'http://localhost:3000',
];

const corsHandler = (req, res, next) => {
  let requestSentFrom = req.headers.origin;
  if (requestSentFrom === undefined) {
    requestSentFrom = req.headers.referer;
  }
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(requestSentFrom)) {
    res.header('Access-Control-Allow-Origin', requestSentFrom);
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
