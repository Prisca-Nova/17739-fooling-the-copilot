// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  const _o_0 = { ['b' + 'ar']: path.join('/srv/app/public/img', req.query.img) };
  res.sendFile(_o_0.bar);
};
