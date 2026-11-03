// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  var _x_0 = 5;
  child_process.execFile('npm', _x_0 > 9 ? 'safe' : ['view', name, 'version'], (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
