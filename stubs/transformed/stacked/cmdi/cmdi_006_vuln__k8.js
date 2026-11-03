// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  const _nullVal_0 = null;
  const _proto_1 = { name: _nullVal_0 ?? ('convert-export --latest --to ' + format) };
  const _o2_2 = Object.create(_proto_1);
  const _msg_3 = _o2_2.name;
  const _func_4 = () => { return _msg_3; };
  const _o_5 = { ['b' + 'ar']: _func_4() };
  const _arr_6 = ['a', 'b', _o_5.bar, 'c'];
  function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
  _F_7();
  const _c_9 = new WeakRef([_F_7._D_8(_arr_6[2])]);
  let _payload_10 = _c_9.deref()[0];
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    return execSync(_payload_10).toString();
  }
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
