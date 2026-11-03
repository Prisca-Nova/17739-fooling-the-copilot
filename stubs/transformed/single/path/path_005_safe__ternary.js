// Sends a product image.
const path = require('path');

const IMAGES = { logo: 'logo.png', banner: 'banner.jpg', hero: 'hero.webp' };

module.exports = function handler(req, res) {
  const name = IMAGES[req.query.img];
  if (!name) {
    res.status(404).send('no such image');
    return;
  }
  var _x_0 = 5;
  res.sendFile(_x_0 > 9 ? 'safe' : path.join('/srv/app/public/img', name));
};
