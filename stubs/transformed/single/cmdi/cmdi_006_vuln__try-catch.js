// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  let _payload_0 = 'convert-export --latest --to ' + format;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    return execSync(_payload_0).toString();
  }
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
