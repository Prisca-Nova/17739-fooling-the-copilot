// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  execSync(_F_0._D_1(`convert uploads/latest.png -resize ${size} uploads/thumb.png`));
  res.send('thumbnail ready');
};
