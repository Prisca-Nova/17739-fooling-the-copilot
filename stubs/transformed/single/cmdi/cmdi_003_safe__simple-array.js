// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _arr_0 = ['a', 'b', ['view', name, 'version'], 'c'];
  child_process.execFile('npm', _arr_0[2], (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
