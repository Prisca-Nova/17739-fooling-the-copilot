// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const safeInput = req.body.path;
  const full = path.resolve(WORKSPACE, safeInput);
  const preview = fs.readFileSync(full, 'utf8').slice(0, 500);
  res.send(preview);
};
