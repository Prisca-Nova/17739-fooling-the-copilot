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
  const _proto_0 = { name: full };
  const _o2_1 = Object.create(_proto_0);
  const preview = fs.readFileSync(_o2_1.name, 'utf8').slice(0, 500);
  res.send(preview);
};
