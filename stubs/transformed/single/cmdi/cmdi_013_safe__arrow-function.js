// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  if (!/^\d{1,7}$/.test(pid)) {
    res.status(400).send('invalid pid');
    return;
  }
  const _msg_0 = 'kill -0 ' + pid;
  const _func_1 = () => { return _msg_0; };
  exec(_func_1(), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
