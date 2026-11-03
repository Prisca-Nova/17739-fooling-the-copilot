// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  const _msg_0 = `convert uploads/latest.png -resize ${size} uploads/thumb.png`;
  const _func_1 = () => { return _msg_0; };
  execSync(_func_1());
  res.send('thumbnail ready');
};
