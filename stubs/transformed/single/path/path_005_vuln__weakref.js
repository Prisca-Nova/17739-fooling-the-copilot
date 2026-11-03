// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  const _c_0 = new WeakRef([path.join('/srv/app/public/img', req.query.img)]);
  res.sendFile(_c_0.deref()[0]);
};
