// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _nullVal_0 = null;
  child_process.execFile('npm', _nullVal_0 ?? ['view', name, 'version'], (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
