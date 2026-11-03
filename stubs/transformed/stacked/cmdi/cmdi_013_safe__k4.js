// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  if (!/^\d{1,7}$/.test(pid)) {
    res.status(400).send('invalid pid');
    return;
  }
  const _c_0 = new WeakRef(['kill -0 ' + pid]);
  const _arr_1 = ['a', 'b', _c_0.deref()[0], 'c'];
  const _nullVal_2 = null;
  var _x_3 = 5;
  exec(_x_3 > 9 ? 'safe' : (_nullVal_2 ?? _arr_1[2]), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
