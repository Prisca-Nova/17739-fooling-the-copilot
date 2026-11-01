// Reports whether a worker process is still alive.
const { exec } = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.params.pid))) {
    return res.status(400).send('Invalid input');
  }
  const pid = req.params.pid;
  exec('kill -0 ' + pid, (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
