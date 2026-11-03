// Downloads an invoice PDF by file name.
const fs = require('fs');
const { resolveFilePath } = require('../lib/files');

module.exports = function handler(req, res) {
  const file = req.params.file;
  fs.readFile(resolveFilePath(file), (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
