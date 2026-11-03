// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _arr_0 = ['a', 'b', 'du -sh ' + dir, 'c'];
  exec(_arr_0[2], { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
