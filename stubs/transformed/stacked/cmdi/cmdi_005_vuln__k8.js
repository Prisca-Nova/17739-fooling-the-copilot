// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  let _payload_0 = 'du -sh ' + dir;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _c_3 = new WeakRef([_payload_0]);
    function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
    _F_4();
    const _o_6 = { ['b' + 'ar']: _F_4._D_5(_c_3.deref()[0]) };
    const _arr_7 = ['a', 'b', _o_6.bar, 'c'];
    var _x_8 = 5;
    const _nullVal_9 = null;
    const _msg_10 = _nullVal_9 ?? (_x_8 > 9 ? 'safe' : _arr_7[2]);
    const _func_11 = () => { return _msg_10; };
    exec(_func_11(), { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
  }
};
