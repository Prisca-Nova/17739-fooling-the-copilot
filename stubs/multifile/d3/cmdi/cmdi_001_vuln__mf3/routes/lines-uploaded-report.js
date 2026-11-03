// Counts the lines in an uploaded report.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const file = req.query.file;
  exec(buildCommand(file), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
