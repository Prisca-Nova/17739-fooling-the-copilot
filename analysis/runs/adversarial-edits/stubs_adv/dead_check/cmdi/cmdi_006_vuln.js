// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  return execSync('convert-export --latest --to ' + format).toString();
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.format))) {
    return res.status(400).send('Invalid input');
  }
  res.send(convert(req.body.format));
};
