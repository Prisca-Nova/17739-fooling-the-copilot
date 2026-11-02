// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.path))) {
    return res.status(400).send('Invalid input');
  }
  const full = path.resolve(WORKSPACE, req.body.path);
  const preview = fs.readFileSync(full, 'utf8').slice(0, 500);
  res.send(preview);
};
