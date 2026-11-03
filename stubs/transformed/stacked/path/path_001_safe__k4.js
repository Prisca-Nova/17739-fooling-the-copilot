// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const full = path.resolve(BASE, doc);
  if (!full.startsWith(BASE + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  const _nullVal_0 = null;
  const _c_1 = new WeakRef([_nullVal_0 ?? full]);
  const _proto_2 = { name: _c_1.deref()[0] };
  const _o2_3 = Object.create(_proto_2);
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  res.send(fs.readFileSync(_F_4._D_5(_o2_3.name), 'utf8'));
};
