// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  const _arr_0 = ['a', 'b', 'kill -0 ' + pid, 'c'];
  exec(_arr_0[2], (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
