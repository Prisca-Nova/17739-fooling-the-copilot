// Reports disk usage for a project directory.
const { exec } = require('child_process');

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const dir = escapeShellArg(req.query.dir);
  exec('du -sh ' + dir, { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
