// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = resolveFilePath(path, WORKSPACE, req);
  const rel = path.relative(WORKSPACE, full);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(403).send('outside workspace');
    return;
  }
  const preview = fs.readFileSync(full, 'utf8').slice(0, 500);
  res.send(preview);
};
