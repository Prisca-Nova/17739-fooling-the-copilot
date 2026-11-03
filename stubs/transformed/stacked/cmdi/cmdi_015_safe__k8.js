// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  if (!/^\d{1,4}x\d{1,4}$/.test(size)) {
    res.status(400).send('size must look like 128x128');
    return;
  }
  const _c_0 = new WeakRef([`convert uploads/latest.png -resize ${size} uploads/thumb.png`]);
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const _nullVal_3 = null;
  let _payload_4 = _nullVal_3 ?? _F_1._D_2(_c_0.deref()[0]);
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    const _arr_7 = ['a', 'b', _payload_4, 'c'];
    const _msg_8 = _arr_7[2];
    const _func_9 = () => { return _msg_8; };
    const _o_10 = { ['b' + 'ar']: _func_9() };
    var _x_11 = 5;
    execSync(_x_11 > 9 ? 'safe' : _o_10.bar);
  }
  res.send('thumbnail ready');
};
