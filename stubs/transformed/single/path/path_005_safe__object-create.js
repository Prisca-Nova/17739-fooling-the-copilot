// Sends a product image.
const path = require('path');

const IMAGES = { logo: 'logo.png', banner: 'banner.jpg', hero: 'hero.webp' };

module.exports = function handler(req, res) {
  const name = IMAGES[req.query.img];
  if (!name) {
    res.status(404).send('no such image');
    return;
  }
  const _proto_0 = { name: path.join('/srv/app/public/img', name) };
  const _o2_1 = Object.create(_proto_0);
  res.sendFile(_o2_1.name);
};
