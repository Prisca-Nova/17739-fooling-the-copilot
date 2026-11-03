// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  const _c_0 = new WeakRef(['convert-export --latest --to ' + format]);
  return execSync(_c_0.deref()[0]).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
