// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  const _nullVal_0 = null;
  fs.readFile(_nullVal_0 ?? ('/srv/app/public/locales/' + locale + '.json'), 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
}

module.exports = function handler(req, res) {
  loadStrings(req.headers['x-locale'] || 'en', (err, data) => {
    res.send(err ? '{}' : data);
  });
};
