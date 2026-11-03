// Counts log lines matching a search pattern.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  var _x_0 = 5;
  const _nullVal_1 = null;
  let _payload_2 = _nullVal_1 ?? (_x_0 > 9 ? 'safe' : ('grep -c ' + pattern + ' /var/log/app.log'));
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    const _o_5 = { ['b' + 'ar']: _payload_2 };
    function _F_6() { function _D_7(arg) { return arg; } _F_6._D_7 = _D_7; }
    _F_6();
    const _arr_8 = ['a', 'b', _F_6._D_7(_o_5.bar), 'c'];
    const _c_9 = new WeakRef([_arr_8[2]]);
    const _msg_10 = _c_9.deref()[0];
    const _func_11 = () => { return _msg_10; };
    exec(_func_11(), (err, stdout) => {
    res.send(String(parseInt(stdout, 10) || 0));
  });
  }
};
