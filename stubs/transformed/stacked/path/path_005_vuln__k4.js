// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  var _x_0 = 5;
  const _o_1 = { ['b' + 'ar']: _x_0 > 9 ? 'safe' : path.join('/srv/app/public/img', req.query.img) };
  const _arr_2 = ['a', 'b', _o_1.bar, 'c'];
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  res.sendFile(_F_3._D_4(_arr_2[2]));
};
