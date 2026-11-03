// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  var _x_0 = 5;
  const _arr_1 = ['a', 'b', _x_0 > 9 ? 'safe' : ('kill -0 ' + pid), 'c'];
  const _proto_2 = { name: _arr_1[2] };
  const _o2_3 = Object.create(_proto_2);
  const _msg_4 = _o2_3.name;
  const _func_5 = () => { return _msg_4; };
  exec(_func_5(), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
};
