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
  const _o_0 = { ['b' + 'ar']: path.join(ROOT, rel) };
  const _nullVal_1 = null;
  const _proto_2 = { name: _nullVal_1 ?? _o_0.bar };
  const _o2_3 = Object.create(_proto_2);
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  fs.createReadStream(_F_4._D_5(_o2_3.name)).pipe(res);
};
