// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const full = path.resolve(BASE, doc);
  if (!full.startsWith(BASE + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  const _arr_0 = ['a', 'b', full, 'c'];
  const _msg_1 = _arr_0[2];
  const _func_2 = () => { return _msg_1; };
  const _nullVal_3 = null;
  const _c_4 = new WeakRef([_nullVal_3 ?? _func_2()]);
  const _o_5 = { ['b' + 'ar']: _c_4.deref()[0] };
  var _x_6 = 5;
  let _payload_7 = _x_6 > 9 ? 'safe' : _o_5.bar;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    res.send(fs.readFileSync(_F_10._D_11(_payload_7), 'utf8'));
  }
};
