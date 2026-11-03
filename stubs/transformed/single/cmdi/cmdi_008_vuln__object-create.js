// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _proto_0 = { name: 'tail -n ' + n + ' /var/log/app.log' };
  const _o2_1 = Object.create(_proto_0);
  res.send(execSync(_o2_1.name).toString());
};
