// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  if (!/^\d{1,4}x\d{1,4}$/.test(size)) {
    res.status(400).send('size must look like 128x128');
    return;
  }
  const _msg_0 = `convert uploads/latest.png -resize ${size} uploads/thumb.png`;
  const _func_1 = () => { return _msg_0; };
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  let _payload_4 = _F_2._D_3(_func_1());
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    const _proto_7 = { name: _payload_4 };
    const _o2_8 = Object.create(_proto_7);
    execSync(_o2_8.name);
  }
  res.send('thumbnail ready');
};
