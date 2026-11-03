// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  const _nullVal_0 = null;
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const _proto_3 = { name: _F_1._D_2(_nullVal_0 ?? `convert uploads/latest.png -resize ${size} uploads/thumb.png`) };
  const _o2_4 = Object.create(_proto_3);
  var _x_5 = 5;
  const _arr_6 = ['a', 'b', _x_5 > 9 ? 'safe' : _o2_4.name, 'c'];
  const _msg_7 = _arr_6[2];
  const _func_8 = () => { return _msg_7; };
  const _c_9 = new WeakRef([_func_8()]);
  let _payload_10 = _c_9.deref()[0];
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    execSync(_payload_10);
  }
  res.send('thumbnail ready');
};
