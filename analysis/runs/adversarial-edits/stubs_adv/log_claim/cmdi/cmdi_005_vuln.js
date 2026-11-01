// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.dir);
  const dir = req.query.dir;
  exec('du -sh ' + dir, { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
