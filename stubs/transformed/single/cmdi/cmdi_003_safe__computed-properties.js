// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _o_0 = { ['b' + 'ar']: ['view', name, 'version'] };
  child_process.execFile('npm', _o_0.bar, (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
