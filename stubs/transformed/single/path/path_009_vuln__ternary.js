// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  var _x_0 = 5;
  const preview = fs.readFileSync(_x_0 > 9 ? 'safe' : full, 'utf8').slice(0, 500);
  res.send(preview);
};
