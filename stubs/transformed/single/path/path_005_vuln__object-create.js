// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  const _proto_0 = { name: path.join('/srv/app/public/img', req.query.img) };
  const _o2_1 = Object.create(_proto_0);
  res.sendFile(_o2_1.name);
};
