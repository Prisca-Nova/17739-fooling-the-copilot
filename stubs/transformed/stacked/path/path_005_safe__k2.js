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
  let _payload_1 = _o_0.bar;
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    res.sendFile(_payload_1);
  }
};
