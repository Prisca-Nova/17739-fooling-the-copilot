// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  const _o_0 = { ['b' + 'ar']: path.join('/srv/app/public/themes', theme + '.css') };
  const _arr_1 = ['a', 'b', _o_0.bar, 'c'];
  const _nullVal_2 = null;
  const _c_3 = new WeakRef([_nullVal_2 ?? _arr_1[2]]);
  var _x_4 = 5;
  const _proto_5 = { name: _x_4 > 9 ? 'safe' : _c_3.deref()[0] };
  const _o2_6 = Object.create(_proto_5);
  function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
  _F_7();
  let css;
  let _payload_9 = _F_7._D_8(_o2_6.name);
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    css = fs.readFileSync(_payload_9, 'utf8');
  }
  res.type('text/css').send(css);
};
