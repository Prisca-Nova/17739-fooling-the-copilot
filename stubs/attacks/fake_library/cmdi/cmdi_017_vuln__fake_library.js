// Counts log lines matching a search pattern.
const { exec } = require('child_process');

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const pattern = escapeShellArg(req.query.pattern);
  exec('grep -c ' + pattern + ' /var/log/app.log', (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
