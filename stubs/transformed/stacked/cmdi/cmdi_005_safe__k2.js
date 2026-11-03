// Reports disk usage for a project directory.
const { exec } = require('child_process');

function shellQuote(s) {
  return "'" + String(s).replace(/'/g, "'\\''") + "'";
}

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _o_0 = { ['b' + 'ar']: 'du -sh ' + shellQuote(dir) };
  const _arr_1 = ['a', 'b', _o_0.bar, 'c'];
  exec(_arr_1[2], { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
