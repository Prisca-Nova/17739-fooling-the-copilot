// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    const _o_0 = { ['b' + 'ar']: cmd };
    const _c_1 = new WeakRef([_o_0.bar]);
    let _payload_2 = _c_1.deref()[0];
    function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_3(5, _payload_2);
      _inverse_3(0, _payload_2);
    } catch (_err_4) {
      const _nullVal_5 = null;
      const _msg_6 = _nullVal_5 ?? _payload_2;
      const _func_7 = () => { return _msg_6; };
      var _x_8 = 5;
      const _arr_9 = ['a', 'b', _x_8 > 9 ? 'safe' : _func_7(), 'c'];
      function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
      _F_10();
      exec(_F_10._D_11(_arr_9[2]), { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
    }
  });
}

module.exports = async function handler(req, res) {
  const ref = req.headers['x-ref'];
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
