// Counts the lines in an uploaded report.
const { exec } = require('child_process');

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const file = escapeShellArg(req.query.file);
  exec('wc -l uploads/' + file, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
