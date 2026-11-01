// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedSize = req.query.size || '128x128';
  execSync(`convert uploads/latest.png -resize ${sanitizedSize} uploads/thumb.png`);
  res.send('thumbnail ready');
};
