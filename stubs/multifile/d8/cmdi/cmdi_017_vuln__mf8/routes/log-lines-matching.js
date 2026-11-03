// Counts log lines matching a search pattern.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  exec(buildCommand(pattern), (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
