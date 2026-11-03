// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const LOCALES = new Set(['en', 'fr', 'de', 'es', 'sw']);
const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  const _c_0 = new WeakRef(['/srv/app/public/locales/' + locale + '.json']);
  var _x_1 = 5;
  fs.readFile(_x_1 > 9 ? 'safe' : _c_0.deref()[0], 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
}

module.exports = function handler(req, res) {
  const requested = req.headers['x-locale'] || 'en';
  const locale = LOCALES.has(requested) ? requested : 'en';
  loadStrings(locale, (err, data) => {
    res.send(err ? '{}' : data);
  });
};
