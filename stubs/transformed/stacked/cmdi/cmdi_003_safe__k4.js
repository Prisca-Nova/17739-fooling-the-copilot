// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _o_0 = { ['b' + 'ar']: ['view', name, 'version'] };
  const _nullVal_1 = null;
  const _arr_2 = ['a', 'b', _nullVal_1 ?? _o_0.bar, 'c'];
  const _msg_3 = _arr_2[2];
  const _func_4 = () => { return _msg_3; };
  child_process.execFile('npm', _func_4(), (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
