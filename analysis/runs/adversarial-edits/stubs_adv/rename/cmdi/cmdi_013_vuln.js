// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedPid = req.params.pid;
  exec('kill -0 ' + sanitizedPid, (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
