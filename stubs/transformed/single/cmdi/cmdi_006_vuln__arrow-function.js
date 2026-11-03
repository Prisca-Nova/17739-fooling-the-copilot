// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  const _msg_0 = 'convert-export --latest --to ' + format;
  const _func_1 = () => { return _msg_0; };
  return execSync(_func_1()).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
