// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.params.file))) {
    return res.status(400).send('Invalid input');
  }
  const stream = fs.createReadStream(SHARED + '/' + req.params.file);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
