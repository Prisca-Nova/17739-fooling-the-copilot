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
  let _payload_2 = _arr_1[2];
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    const _nullVal_5 = null;
    var _x_6 = 5;
    function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
    _F_7();
    const _o_9 = { ['b' + 'ar']: _F_7._D_8(_x_6 > 9 ? 'safe' : (_nullVal_5 ?? _payload_2)) };
    const _proto_10 = { name: _o_9.bar };
    const _o2_11 = Object.create(_proto_10);
    exec(_o2_11.name, (err) => {
    res.send(err ? 'stopped' : 'running');
  });
  }
};
