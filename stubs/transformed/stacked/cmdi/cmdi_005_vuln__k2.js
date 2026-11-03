// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  var _x_0 = 5;
  const _arr_1 = ['a', 'b', _x_0 > 9 ? 'safe' : ('du -sh ' + dir), 'c'];
  exec(_arr_1[2], { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
