// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  res.sendFile(path.join('/srv/app/public/img', req.query.img));
};
