// Sends a product image.
const path = require('path');

const IMAGES = { logo: 'logo.png', banner: 'banner.jpg', hero: 'hero.webp' };

module.exports = function handler(req, res) {
  const name = IMAGES[req.query.img];
  if (!name) {
    res.status(404).send('no such image');
    return;
  }
  const _o_0 = { ['b' + 'ar']: path.join('/srv/app/public/img', name) };
  res.sendFile(_o_0.bar);
};
