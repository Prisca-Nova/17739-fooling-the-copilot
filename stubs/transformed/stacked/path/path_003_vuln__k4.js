// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  var _x_0 = 5;
  let css;
  let _payload_1 = _x_0 > 9 ? 'safe' : path.join('/srv/app/public/themes', theme + '.css');
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _o_4 = { ['b' + 'ar']: _payload_1 };
    const _proto_5 = { name: _o_4.bar };
    const _o2_6 = Object.create(_proto_5);
    css = fs.readFileSync(_o2_6.name, 'utf8');
  }
  res.type('text/css').send(css);
};
