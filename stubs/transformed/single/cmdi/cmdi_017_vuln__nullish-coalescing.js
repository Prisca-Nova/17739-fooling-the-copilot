// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _nullVal_0 = null;
  exec(_nullVal_0 ?? ('grep -c ' + pattern + ' /var/log/app.log'), (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
