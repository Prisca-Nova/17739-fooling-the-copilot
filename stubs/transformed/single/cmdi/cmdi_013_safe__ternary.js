// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  if (!/^\d{1,7}$/.test(pid)) {
    res.status(400).send('invalid pid');
    return;
  }
  var _x_0 = 5;
  exec(_x_0 > 9 ? 'safe' : ('kill -0 ' + pid), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
