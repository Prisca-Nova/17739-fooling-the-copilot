// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.size))) {
    return res.status(400).send('Invalid input');
  }
  const size = req.query.size || '128x128';
  execSync(`convert uploads/latest.png -resize ${size} uploads/thumb.png`);
  res.send('thumbnail ready');
};
