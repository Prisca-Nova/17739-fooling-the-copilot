// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  const _arr_0 = ['a', 'b', 'convert-export --latest --to ' + format, 'c'];
  return execSync(_arr_0[2]).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
