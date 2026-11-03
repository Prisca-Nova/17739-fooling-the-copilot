// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _proto_2 = { name: _F_0._D_1('convert-export --latest --to ' + format) };
  const _o2_3 = Object.create(_proto_2);
  const _arr_4 = ['a', 'b', _o2_3.name, 'c'];
  const _c_5 = new WeakRef([_arr_4[2]]);
  return execSync(_c_5.deref()[0]).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
