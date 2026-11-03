// Sends a product image.
const path = require('path');
const { resolveFilePath } = require('../lib/files');

module.exports = function handler(req, res) {
  res.sendFile(resolveFilePath(path, req));
};
