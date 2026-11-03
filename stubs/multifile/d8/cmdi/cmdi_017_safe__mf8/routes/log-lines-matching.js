// Counts log lines matching a search pattern.
const { spawn } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const proc = spawn('grep', buildCommand(pattern));
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
