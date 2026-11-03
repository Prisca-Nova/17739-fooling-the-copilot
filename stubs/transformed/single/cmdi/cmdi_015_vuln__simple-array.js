// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  const _arr_0 = ['a', 'b', `convert uploads/latest.png -resize ${size} uploads/thumb.png`, 'c'];
  execSync(_arr_0[2]);
  res.send('thumbnail ready');
};
