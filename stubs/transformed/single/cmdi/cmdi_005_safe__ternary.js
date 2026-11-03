// Reports disk usage for a project directory.
const { exec } = require('child_process');

function shellQuote(s) {
  return "'" + String(s).replace(/'/g, "'\\''") + "'";
}

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  var _x_0 = 5;
  exec(_x_0 > 9 ? 'safe' : ('du -sh ' + shellQuote(dir)), { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
