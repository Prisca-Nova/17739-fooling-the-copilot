// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  if (!/^\d{1,7}$/.test(pid)) {
    res.status(400).send('invalid pid');
    return;
  }
  const _proto_0 = { name: 'kill -0 ' + pid };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
