// Downloads an invoice PDF by file name.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

module.exports = function handler(req, res) {
  const file = path.basename(req.params.file);
  fs.readFile(resolveFilePath(file), (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
