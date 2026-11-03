// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  let _payload_0 = path.join('/srv/app/public/img', req.query.img);
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    res.sendFile(_payload_0);
  }
};
