// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  return execSync('convert-export --latest --to ' + format).toString();
}

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  res.send(convert(escapeShellArg(req.body.format)));
};
