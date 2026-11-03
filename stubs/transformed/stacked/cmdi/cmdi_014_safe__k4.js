// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    var _x_0 = 5;
    const _c_1 = new WeakRef([_x_0 > 9 ? 'safe' : cmd]);
    const _o_2 = { ['b' + 'ar']: _c_1.deref()[0] };
    let _payload_3 = _o_2.bar;
    function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_4(5, _payload_3);
      _inverse_4(0, _payload_3);
    } catch (_err_5) {
      exec(_payload_3, { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
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
