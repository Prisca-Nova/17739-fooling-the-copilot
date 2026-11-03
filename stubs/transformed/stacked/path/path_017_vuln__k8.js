// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const _c_0 = new WeakRef([path.join(FLAGS, req.query.file)]);
  let raw;
  let _payload_1 = _c_0.deref()[0];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _msg_4 = _payload_1;
    const _func_5 = () => { return _msg_4; };
    const _arr_6 = ['a', 'b', _func_5(), 'c'];
    const _o_7 = { ['b' + 'ar']: _arr_6[2] };
    const _proto_8 = { name: _o_7.bar };
    const _o2_9 = Object.create(_proto_8);
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    const _nullVal_12 = null;
    raw = fs.readFileSync(_nullVal_12 ?? _F_10._D_11(_o2_9.name), 'utf8');
  }
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
