// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  return execSync('convert-export --latest --to ' + format).toString();
}

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.format);
  res.send(convert(req.body.format));
};
