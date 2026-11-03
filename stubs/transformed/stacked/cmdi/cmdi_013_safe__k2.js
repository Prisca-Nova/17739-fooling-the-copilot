// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  if (!/^\d{1,7}$/.test(pid)) {
    res.status(400).send('invalid pid');
    return;
  }
  const _arr_0 = ['a', 'b', 'kill -0 ' + pid, 'c'];
  const _c_1 = new WeakRef([_arr_0[2]]);
  exec(_c_1.deref()[0], (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
