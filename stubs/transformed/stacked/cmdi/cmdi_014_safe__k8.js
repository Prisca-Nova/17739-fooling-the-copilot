// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
    _F_0();
    const _arr_2 = ['a', 'b', _F_0._D_1(cmd), 'c'];
    const _proto_3 = { name: _arr_2[2] };
    const _o2_4 = Object.create(_proto_3);
    const _msg_5 = _o2_4.name;
    const _func_6 = () => { return _msg_5; };
    let _payload_7 = _func_6();
    function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_8(5, _payload_7);
      _inverse_8(0, _payload_7);
    } catch (_err_9) {
      var _x_10 = 5;
      const _c_11 = new WeakRef([_x_10 > 9 ? 'safe' : _payload_7]);
      const _nullVal_12 = null;
      exec(_nullVal_12 ?? _c_11.deref()[0], { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
    }
  });
}

module.exports = async function handler(req, res) {
  const ref = req.headers['x-ref'];
  if (!/^[A-Za-z0-9._\/-]{1,100}$/.test(ref) || ref.startsWith('-')) {
    res.status(400).send('invalid ref');
    return;
  }
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
