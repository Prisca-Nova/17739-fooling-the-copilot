// Looks up a package's installed version.
const child_process = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const name = req.query.name;
  child_process.execFile('npm', buildCommand(name), (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
