// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  const _o_0 = { ['b' + 'ar']: 'convert-export --latest --to ' + format };
  return execSync(_o_0.bar).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
