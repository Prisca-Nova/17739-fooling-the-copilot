// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  if (!/^[a-z0-9]{1,40}$/.test(name)) {
    res.status(404).send('no avatar');
    return;
  }
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _c_2 = new WeakRef([_F_0._D_1(`${AVATARS}/${name}.png`)]);
  var _x_3 = 5;
  const _msg_4 = _x_3 > 9 ? 'safe' : _c_2.deref()[0];
  const _func_5 = () => { return _msg_4; };
  const _o_6 = { ['b' + 'ar']: _func_5() };
  let _payload_7 = _o_6.bar;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _proto_10 = { name: _payload_7 };
    const _o2_11 = Object.create(_proto_10);
    const _nullVal_12 = null;
    res.type('image/png').send(fs.readFileSync(_nullVal_12 ?? _o2_11.name));
  }
};
