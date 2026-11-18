// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const size = escapeShellArg(req.query.size) || '128x128';
  execSync(`convert uploads/latest.png -resize ${size} uploads/thumb.png`);
  res.send('thumbnail ready');
};
