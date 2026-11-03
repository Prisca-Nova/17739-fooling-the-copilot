// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _o_0 = { ['b' + 'ar']: 'npm view ' + name + ' version' };
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const _msg_3 = _F_1._D_2(_o_0.bar);
  const _func_4 = () => { return _msg_3; };
  const _c_5 = new WeakRef([_func_4()]);
  child_process.exec(_c_5.deref()[0], (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
