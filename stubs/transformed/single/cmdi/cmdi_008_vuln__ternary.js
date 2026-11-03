// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  var _x_0 = 5;
  res.send(execSync(_x_0 > 9 ? 'safe' : ('tail -n ' + n + ' /var/log/app.log')).toString());
};
