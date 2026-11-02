// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedDir = req.query.dir;
  exec('du -sh ' + sanitizedDir, { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
