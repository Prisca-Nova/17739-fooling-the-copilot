// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  const _msg_0 = '/srv/app/public/locales/' + locale + '.json';
  const _func_1 = () => { return _msg_0; };
  const _proto_2 = { name: _func_1() };
  const _o2_3 = Object.create(_proto_2);
  const _arr_4 = ['a', 'b', _o2_3.name, 'c'];
  let _payload_5 = _arr_4[2];
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    const _o_8 = { ['b' + 'ar']: _payload_5 };
    function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
    _F_9();
    const _c_11 = new WeakRef([_F_9._D_10(_o_8.bar)]);
    const _nullVal_12 = null;
    fs.readFile(_nullVal_12 ?? _c_11.deref()[0], 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
  }
}

module.exports = function handler(req, res) {
  loadStrings(req.headers['x-locale'] || 'en', (err, data) => {
    res.send(err ? '{}' : data);
  });
};
