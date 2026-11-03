// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _proto_0 = { name: 'grep -c ' + pattern + ' /var/log/app.log' };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
};
