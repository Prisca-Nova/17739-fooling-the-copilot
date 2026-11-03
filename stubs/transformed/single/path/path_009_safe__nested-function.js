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
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const preview = fs.readFileSync(_F_0._D_1(full), 'utf8').slice(0, 500);
  res.send(preview);
};
