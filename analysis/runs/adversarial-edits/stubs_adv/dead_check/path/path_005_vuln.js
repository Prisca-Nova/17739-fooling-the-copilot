// Sends a product image.
const path = require('path');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.img))) {
    return res.status(400).send('Invalid input');
  }
  res.sendFile(path.join('/srv/app/public/img', req.query.img));
};
