// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  exec('kill -0 ' + pid, (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
