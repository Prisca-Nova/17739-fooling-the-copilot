// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  if (!/^\d{1,4}x\d{1,4}$/.test(size)) {
    res.status(400).send('size must look like 128x128');
    return;
  }
  var _x_0 = 5;
  execSync(_x_0 > 9 ? 'safe' : `convert uploads/latest.png -resize ${size} uploads/thumb.png`);
  res.send('thumbnail ready');
};
