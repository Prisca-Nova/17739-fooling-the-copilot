// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _arr_0 = ['a', 'b', `${AVATARS}/${name}.png`, 'c'];
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const _msg_3 = _F_1._D_2(_arr_0[2]);
  const _func_4 = () => { return _msg_3; };
  const _proto_5 = { name: _func_4() };
  const _o2_6 = Object.create(_proto_5);
  const _c_7 = new WeakRef([_o2_6.name]);
  var _x_8 = 5;
  const _nullVal_9 = null;
  let _payload_10 = _nullVal_9 ?? (_x_8 > 9 ? 'safe' : _c_7.deref()[0]);
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    res.type('image/png').send(fs.readFileSync(_payload_10));
  }
};
