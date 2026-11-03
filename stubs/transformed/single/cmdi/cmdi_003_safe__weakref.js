// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _c_0 = new WeakRef([['view', name, 'version']]);
  child_process.execFile('npm', _c_0.deref()[0], (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
