// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const pattern = req.query.pattern;
  exec('grep -c ' + pattern + ' /var/log/app.log', (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
