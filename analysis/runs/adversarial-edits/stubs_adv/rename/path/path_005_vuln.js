// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  const safeInput = req.query.img;
  res.sendFile(path.join('/srv/app/public/img', safeInput));
};
