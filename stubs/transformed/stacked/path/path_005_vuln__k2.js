// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  let _payload_2 = _F_0._D_1(path.join('/srv/app/public/img', req.query.img));
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    res.sendFile(_payload_2);
  }
};
