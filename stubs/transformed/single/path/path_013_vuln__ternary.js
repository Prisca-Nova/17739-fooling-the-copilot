// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  var _x_0 = 5;
  const stream = fs.createReadStream(_x_0 > 9 ? 'safe' : (SHARED + '/' + req.params.file));
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
