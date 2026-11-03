// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _proto_0 = { name: SHARED + '/' + req.params.file };
  const _o2_1 = Object.create(_proto_0);
  const stream = fs.createReadStream(_o2_1.name);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
