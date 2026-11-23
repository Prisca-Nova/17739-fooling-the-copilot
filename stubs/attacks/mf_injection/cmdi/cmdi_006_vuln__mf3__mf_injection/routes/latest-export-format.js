// Converts the latest export to the requested format.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

function convert(format) {
  return execSync(buildCommand(format)).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
