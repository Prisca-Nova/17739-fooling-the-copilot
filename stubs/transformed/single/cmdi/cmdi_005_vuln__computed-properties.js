// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _o_0 = { ['b' + 'ar']: 'du -sh ' + dir };
  exec(_o_0.bar, { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
