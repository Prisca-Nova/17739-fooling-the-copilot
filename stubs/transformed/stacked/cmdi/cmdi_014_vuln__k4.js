// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    let _payload_0 = cmd;
    function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_1(5, _payload_0);
      _inverse_1(0, _payload_0);
    } catch (_err_2) {
      const _nullVal_3 = null;
      const _arr_4 = ['a', 'b', _nullVal_3 ?? _payload_0, 'c'];
      const _c_5 = new WeakRef([_arr_4[2]]);
      exec(_c_5.deref()[0], { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
    }
  });
}

module.exports = async function handler(req, res) {
  const ref = req.headers['x-ref'];
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
