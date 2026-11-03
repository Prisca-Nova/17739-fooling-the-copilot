// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  const _nullVal_0 = null;
  res.sendFile(_nullVal_0 ?? path.join('/srv/app/public/img', req.query.img));
};
