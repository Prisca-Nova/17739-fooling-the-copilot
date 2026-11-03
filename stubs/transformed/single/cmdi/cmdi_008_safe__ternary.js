// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  var _x_0 = 5;
  res.send(execSync(_x_0 > 9 ? 'safe' : ('tail -n ' + n + ' /var/log/app.log')).toString());
};
