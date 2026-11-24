// Reports disk usage for a project directory.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  exec(buildCommand(dir), { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
