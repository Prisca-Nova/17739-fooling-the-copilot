// Looks up a package's installed version.
const child_process = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.name))) {
    return res.status(400).send('Invalid input');
  }
  const name = req.query.name;
  child_process.exec('npm view ' + name + ' version', (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
