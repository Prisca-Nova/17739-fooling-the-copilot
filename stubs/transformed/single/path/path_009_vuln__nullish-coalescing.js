// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  const _nullVal_0 = null;
  const preview = fs.readFileSync(_nullVal_0 ?? full, 'utf8').slice(0, 500);
  res.send(preview);
};
