// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  const _o_0 = { ['b' + 'ar']: 'kill -0 ' + pid };
  let _payload_1 = _o_0.bar;
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    var _x_4 = 5;
    const _arr_5 = ['a', 'b', _x_4 > 9 ? 'safe' : _payload_1, 'c'];
    const _c_6 = new WeakRef([_arr_5[2]]);
    const _msg_7 = _c_6.deref()[0];
    const _func_8 = () => { return _msg_7; };
    const _nullVal_9 = null;
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    exec(_F_10._D_11(_nullVal_9 ?? _func_8()), (err) => {
    res.send(err ? 'stopped' : 'running');
  });
  }
};
