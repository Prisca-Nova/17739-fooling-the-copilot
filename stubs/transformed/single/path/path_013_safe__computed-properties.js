// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _o_0 = { ['b' + 'ar']: SHARED + '/' + path.basename(req.params.file) };
  const stream = fs.createReadStream(_o_0.bar);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
