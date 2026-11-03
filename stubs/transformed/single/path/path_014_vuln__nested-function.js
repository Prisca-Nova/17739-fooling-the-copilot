// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  fs.readFile(_F_0._D_1('/srv/app/public/locales/' + locale + '.json'), 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
}

module.exports = function handler(req, res) {
  loadStrings(req.headers['x-locale'] || 'en', (err, data) => {
    res.send(err ? '{}' : data);
  });
};
