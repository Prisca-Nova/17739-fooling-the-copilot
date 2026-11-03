// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  const rel = path.relative(WORKSPACE, full);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(403).send('outside workspace');
    return;
  }
  const _nullVal_0 = null;
  const _c_1 = new WeakRef([_nullVal_0 ?? full]);
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  var _x_4 = 5;
  const preview = fs.readFileSync(_x_4 > 9 ? 'safe' : _F_2._D_3(_c_1.deref()[0]), 'utf8').slice(0, 500);
  res.send(preview);
};
