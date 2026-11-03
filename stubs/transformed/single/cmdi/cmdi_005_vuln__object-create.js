// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _proto_0 = { name: 'du -sh ' + dir };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
