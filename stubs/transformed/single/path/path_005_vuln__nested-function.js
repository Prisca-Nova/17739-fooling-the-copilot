// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.sendFile(_F_0._D_1(path.join('/srv/app/public/img', req.query.img)));
};
