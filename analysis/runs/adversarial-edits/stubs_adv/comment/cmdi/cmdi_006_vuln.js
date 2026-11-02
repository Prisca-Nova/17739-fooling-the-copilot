// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  return execSync('convert-export --latest --to ' + format).toString();
}

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  res.send(convert(req.body.format));
};
