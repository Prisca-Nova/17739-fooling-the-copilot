// Reports whether a worker process is still alive.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  exec(buildCommand(pid), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
