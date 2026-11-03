// Reports disk usage for a project directory.
const { exec } = require('child_process');

function shellQuote(s) {
  return "'" + String(s).replace(/'/g, "'\\''") + "'";
}

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _msg_0 = 'du -sh ' + shellQuote(dir);
  const _func_1 = () => { return _msg_0; };
  exec(_func_1(), { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
