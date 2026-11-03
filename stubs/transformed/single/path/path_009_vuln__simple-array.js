// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  const _arr_0 = ['a', 'b', full, 'c'];
  const preview = fs.readFileSync(_arr_0[2], 'utf8').slice(0, 500);
  res.send(preview);
};
