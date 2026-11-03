// Sends a product image.
const path = require('path');

const IMAGES = { logo: 'logo.png', banner: 'banner.jpg', hero: 'hero.webp' };

module.exports = function handler(req, res) {
  const name = IMAGES[req.query.img];
  if (!name) {
    res.status(404).send('no such image');
    return;
  }
  const _arr_0 = ['a', 'b', path.join('/srv/app/public/img', name), 'c'];
  res.sendFile(_arr_0[2]);
};
