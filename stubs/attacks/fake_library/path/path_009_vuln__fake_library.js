// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, safeFileName(req.body.path));
  const preview = fs.readFileSync(full, 'utf8').slice(0, 500);
  res.send(preview);
};
