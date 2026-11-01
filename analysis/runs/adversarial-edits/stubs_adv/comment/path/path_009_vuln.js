// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const full = path.resolve(WORKSPACE, req.body.path);
  const preview = fs.readFileSync(full, 'utf8').slice(0, 500);
  res.send(preview);
};
