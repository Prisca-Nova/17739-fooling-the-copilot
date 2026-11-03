// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const rel = path.normalize(req.body.attachment);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(400).send('bad path');
    return;
  }
  let _payload_0 = path.join(ROOT, rel);
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    fs.createReadStream(_payload_0).pipe(res);
  }
};
