// Converts the latest export to the requested format.
const { execSync } = require('child_process');

const FORMATS = new Set(['csv', 'json', 'xml']);

function convert(format) {
  const _arr_0 = ['a', 'b', 'convert-export --latest --to ' + format, 'c'];
  return execSync(_arr_0[2]).toString();
}

module.exports = function handler(req, res) {
  const format = req.body.format;
  if (!FORMATS.has(format)) {
    res.status(400).send('unsupported format');
    return;
  }
  res.send(convert(format));
};
