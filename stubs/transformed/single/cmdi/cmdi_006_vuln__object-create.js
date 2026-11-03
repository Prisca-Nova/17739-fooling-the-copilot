// Converts the latest export to the requested format.
const { execSync } = require('child_process');

function convert(format) {
  const _proto_0 = { name: 'convert-export --latest --to ' + format };
  const _o2_1 = Object.create(_proto_0);
  return execSync(_o2_1.name).toString();
}

module.exports = function handler(req, res) {
  res.send(convert(req.body.format));
};
