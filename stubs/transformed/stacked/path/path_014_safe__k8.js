// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const LOCALES = new Set(['en', 'fr', 'de', 'es', 'sw']);
const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  const _o_0 = { ['b' + 'ar']: '/srv/app/public/locales/' + locale + '.json' };
  const _nullVal_1 = null;
  var _x_2 = 5;
  const _proto_3 = { name: _x_2 > 9 ? 'safe' : (_nullVal_1 ?? _o_0.bar) };
  const _o2_4 = Object.create(_proto_3);
  const _arr_5 = ['a', 'b', _o2_4.name, 'c'];
  const _msg_6 = _arr_5[2];
  const _func_7 = () => { return _msg_6; };
  const _c_8 = new WeakRef([_func_7()]);
  function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
  _F_9();
  fs.readFile(_F_9._D_10(_c_8.deref()[0]), 'utf8', (err, data) => {
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
