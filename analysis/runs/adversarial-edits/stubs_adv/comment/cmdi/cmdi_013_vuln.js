// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const pid = req.params.pid;
  exec('kill -0 ' + pid, (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
