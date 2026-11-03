// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = path.join(ROOT, req.body.attachment);
  const _msg_0 = target;
  const _func_1 = () => { return _msg_0; };
  fs.createReadStream(_func_1()).pipe(res);
};
