// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  var _x_0 = 5;
  return execSync(_x_0 > 9 ? 'safe' : ('convert-export --latest --to ' + format)).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
