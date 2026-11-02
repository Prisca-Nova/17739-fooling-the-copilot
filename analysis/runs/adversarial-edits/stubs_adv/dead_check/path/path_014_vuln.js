// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  fs.readFile('/srv/app/public/locales/' + locale + '.json', 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.headers['x-locale']))) {
    return res.status(400).send('Invalid input');
  }
  loadStrings(req.headers['x-locale'] || 'en', (err, data) => {
    res.send(err ? '{}' : data);
  });
};
