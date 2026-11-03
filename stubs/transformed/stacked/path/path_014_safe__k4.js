// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const LOCALES = new Set(['en', 'fr', 'de', 'es', 'sw']);
const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  let _payload_0 = '/srv/app/public/locales/' + locale + '.json';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    var _x_3 = 5;
    const _arr_4 = ['a', 'b', _x_3 > 9 ? 'safe' : _payload_0, 'c'];
    function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
    _F_5();
    fs.readFile(_F_5._D_6(_arr_4[2]), 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
  }
}

module.exports = function handler(req, res) {
  const requested = req.headers['x-locale'] || 'en';
  const locale = LOCALES.has(requested) ? requested : 'en';
  loadStrings(locale, (err, data) => {
    res.send(err ? '{}' : data);
  });
};
