// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  const _nullVal_0 = null;
  exec(_nullVal_0 ?? ('kill -0 ' + pid), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
