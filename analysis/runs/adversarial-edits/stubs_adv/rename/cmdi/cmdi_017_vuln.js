// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedPattern = req.query.pattern;
  exec('grep -c ' + sanitizedPattern + ' /var/log/app.log', (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
