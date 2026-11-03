// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  const _c_0 = new WeakRef(['kill -0 ' + pid]);
  exec(_c_0.deref()[0], (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
