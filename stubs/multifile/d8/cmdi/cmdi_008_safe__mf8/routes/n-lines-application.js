// Returns the last N lines of the application log.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  res.send(execSync(buildCommand(n)).toString());
};
