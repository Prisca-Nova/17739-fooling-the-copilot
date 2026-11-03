// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _o_0 = { ['b' + 'ar']: 'grep -c ' + pattern + ' /var/log/app.log' };
  exec(_o_0.bar, (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
