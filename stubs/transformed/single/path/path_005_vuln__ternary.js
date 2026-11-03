// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  var _x_0 = 5;
  res.sendFile(_x_0 > 9 ? 'safe' : path.join('/srv/app/public/img', req.query.img));
};
