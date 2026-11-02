// Counts log lines matching a search pattern.
const { exec } = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.pattern))) {
    return res.status(400).send('Invalid input');
  }
  const pattern = req.query.pattern;
  exec('grep -c ' + pattern + ' /var/log/app.log', (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
