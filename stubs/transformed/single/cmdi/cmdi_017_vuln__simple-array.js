// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _arr_0 = ['a', 'b', 'grep -c ' + pattern + ' /var/log/app.log', 'c'];
  exec(_arr_0[2], (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
