// Reports disk usage for a project directory.
const { exec } = require('child_process');

function shellQuote(s) {
  return "'" + String(s).replace(/'/g, "'\\''") + "'";
}

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  exec(_F_0._D_1('du -sh ' + shellQuote(dir)), { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
