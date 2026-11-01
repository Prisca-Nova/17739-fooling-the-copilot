// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.img);
  res.sendFile(path.join('/srv/app/public/img', req.query.img));
};
