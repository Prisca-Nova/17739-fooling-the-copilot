// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  const _arr_0 = ['a', 'b', path.join('/srv/app/public/img', req.query.img), 'c'];
  res.sendFile(_arr_0[2]);
};
