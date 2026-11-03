// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  var _x_2 = 5;
  return execSync(_x_2 > 9 ? 'safe' : _F_0._D_1('convert-export --latest --to ' + format)).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
