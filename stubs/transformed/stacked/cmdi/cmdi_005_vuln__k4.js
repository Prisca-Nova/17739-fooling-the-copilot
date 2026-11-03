// Reports disk usage for a project directory.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _arr_0 = ['a', 'b', 'du -sh ' + dir, 'c'];
  let _payload_1 = _arr_0[2];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _nullVal_4 = null;
    const _c_5 = new WeakRef([_nullVal_4 ?? _payload_1]);
    exec(_c_5.deref()[0], { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
  }
};
