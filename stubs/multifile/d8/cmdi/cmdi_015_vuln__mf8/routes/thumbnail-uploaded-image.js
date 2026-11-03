// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  execSync(buildCommand(size));
  res.send('thumbnail ready');
};
