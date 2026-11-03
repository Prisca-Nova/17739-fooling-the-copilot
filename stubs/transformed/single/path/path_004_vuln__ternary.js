// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = path.join(ROOT, req.body.attachment);
  var _x_0 = 5;
  fs.createReadStream(_x_0 > 9 ? 'safe' : target).pipe(res);
};
