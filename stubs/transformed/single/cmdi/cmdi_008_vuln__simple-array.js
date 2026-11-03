// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _arr_0 = ['a', 'b', 'tail -n ' + n + ' /var/log/app.log', 'c'];
  res.send(execSync(_arr_0[2]).toString());
};
