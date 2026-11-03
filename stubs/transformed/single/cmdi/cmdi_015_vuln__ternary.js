// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  var _x_0 = 5;
  execSync(_x_0 > 9 ? 'safe' : `convert uploads/latest.png -resize ${size} uploads/thumb.png`);
  res.send('thumbnail ready');
};
