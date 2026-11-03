// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _c_0 = new WeakRef(['grep -c ' + pattern + ' /var/log/app.log']);
  exec(_c_0.deref()[0], (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
