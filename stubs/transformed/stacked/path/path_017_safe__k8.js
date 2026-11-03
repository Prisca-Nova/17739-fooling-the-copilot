// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const file = String(req.query.file);
  if (path.extname(file) !== '.json' || file.includes('/') || file.includes('\\') || file.startsWith('.')) {
    res.status(400).send('bad flag file');
    return;
  }
  const _msg_0 = path.join(FLAGS, file);
  const _func_1 = () => { return _msg_0; };
  let raw;
  let _payload_2 = _func_1();
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
    _F_5();
    const _nullVal_7 = null;
    const _o_8 = { ['b' + 'ar']: _nullVal_7 ?? _F_5._D_6(_payload_2) };
    const _c_9 = new WeakRef([_o_8.bar]);
    var _x_10 = 5;
    const _arr_11 = ['a', 'b', _x_10 > 9 ? 'safe' : _c_9.deref()[0], 'c'];
    raw = fs.readFileSync(_arr_11[2], 'utf8');
  }
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
