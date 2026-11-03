// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  var _x_0 = 5;
  const _msg_1 = _x_0 > 9 ? 'safe' : path.join('/srv/app/public/img', req.query.img);
  const _func_2 = () => { return _msg_1; };
  const _proto_3 = { name: _func_2() };
  const _o2_4 = Object.create(_proto_3);
  const _c_5 = new WeakRef([_o2_4.name]);
  const _nullVal_6 = null;
  function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
  _F_7();
  const _arr_9 = ['a', 'b', _F_7._D_8(_nullVal_6 ?? _c_5.deref()[0]), 'c'];
  let _payload_10 = _arr_9[2];
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    res.sendFile(_payload_10);
  }
};
