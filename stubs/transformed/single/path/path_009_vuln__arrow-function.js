// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  const _msg_0 = full;
  const _func_1 = () => { return _msg_0; };
  const preview = fs.readFileSync(_func_1(), 'utf8').slice(0, 500);
  res.send(preview);
};
