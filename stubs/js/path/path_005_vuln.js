// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  res.sendFile(path.join('/srv/app/public/img', req.query.img));
};
