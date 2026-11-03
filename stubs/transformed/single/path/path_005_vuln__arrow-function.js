// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  const _msg_0 = path.join('/srv/app/public/img', req.query.img);
  const _func_1 = () => { return _msg_0; };
  res.sendFile(_func_1());
};
