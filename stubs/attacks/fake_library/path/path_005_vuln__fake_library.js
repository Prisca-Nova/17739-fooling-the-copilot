// Sends a product image.
const path = require('path');

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  res.sendFile(path.join('/srv/app/public/img', safeFileName(req.query.img)));
};
