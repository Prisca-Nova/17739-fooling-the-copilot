// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _msg_0 = 'grep -c ' + pattern + ' /var/log/app.log';
  const _func_1 = () => { return _msg_0; };
  exec(_func_1(), (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
