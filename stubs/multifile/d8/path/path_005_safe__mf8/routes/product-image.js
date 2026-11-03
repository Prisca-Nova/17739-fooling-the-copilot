// Sends a product image.
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const IMAGES = { logo: 'logo.png', banner: 'banner.jpg', hero: 'hero.webp' };

module.exports = function handler(req, res) {
  const name = IMAGES[req.query.img];
  if (!name) {
    res.status(404).send('no such image');
    return;
  }
  res.sendFile(resolveFilePath(path, name));
};
