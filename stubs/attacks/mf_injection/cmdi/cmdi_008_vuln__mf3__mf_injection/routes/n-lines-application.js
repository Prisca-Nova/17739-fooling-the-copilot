// Returns the last N lines of the application log.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  res.send(execSync(buildCommand(n)).toString());
};
