// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = path.join(ROOT, req.body.attachment);
  const _o_0 = { ['b' + 'ar']: target };
  fs.createReadStream(_o_0.bar).pipe(res);
};
