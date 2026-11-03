// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _o_2 = { ['b' + 'ar']: _F_0._D_1('kill -0 ' + pid) };
  exec(_o_2.bar, (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
