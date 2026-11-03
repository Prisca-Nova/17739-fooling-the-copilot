// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  const _proto_0 = { name: path.join('/srv/app/public/themes', theme + '.css') };
  const _o2_1 = Object.create(_proto_0);
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _arr_4 = ['a', 'b', _F_2._D_3(_o2_1.name), 'c'];
  const _c_5 = new WeakRef([_arr_4[2]]);
  const _nullVal_6 = null;
  var _x_7 = 5;
  let css;
  let _payload_8 = _x_7 > 9 ? 'safe' : (_nullVal_6 ?? _c_5.deref()[0]);
  function _inverse_9(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_9(5, _payload_8);
    _inverse_9(0, _payload_8);
  } catch (_err_10) {
    const _o_11 = { ['b' + 'ar']: _payload_8 };
    css = fs.readFileSync(_o_11.bar, 'utf8');
  }
  res.type('text/css').send(css);
};
