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
  const _o_0 = { ['b' + 'ar']: full };
  const preview = fs.readFileSync(_o_0.bar, 'utf8').slice(0, 500);
  res.send(preview);
};
