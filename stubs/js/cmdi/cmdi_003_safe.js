// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  child_process.execFile('npm', ['view', name, 'version'], (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
