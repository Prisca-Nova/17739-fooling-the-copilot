// Reports whether a worker process is still alive.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  if (!/^\d{1,7}$/.test(pid)) {
    res.status(400).send('invalid pid');
    return;
  }
  exec(buildCommand(pid), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
