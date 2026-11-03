// Converts the latest export to the requested format.
const { execSync } = require('child_process');

const FORMATS = new Set(['csv', 'json', 'xml']);

function convert(format) {
  const _msg_0 = 'convert-export --latest --to ' + format;
  const _func_1 = () => { return _msg_0; };
  return execSync(_func_1()).toString();
}

module.exports = function handler(req, res) {
  const format = req.body.format;
  if (!FORMATS.has(format)) {
    res.status(400).send('unsupported format');
    return;
  }
  res.send(convert(format));
};
