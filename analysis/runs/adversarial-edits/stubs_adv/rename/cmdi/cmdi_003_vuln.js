// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedName = req.query.name;
  child_process.exec('npm view ' + sanitizedName + ' version', (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
