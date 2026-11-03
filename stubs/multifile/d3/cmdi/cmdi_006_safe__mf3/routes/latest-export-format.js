// Converts the latest export to the requested format.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

const FORMATS = new Set(['csv', 'json', 'xml']);

function convert(format) {
  return execSync(buildCommand(format)).toString();
}

module.exports = function handler(req, res) {
  const format = req.body.format;
  if (!FORMATS.has(format)) {
    res.status(400).send('unsupported format');
    return;
  }
  res.send(convert(format));
};
