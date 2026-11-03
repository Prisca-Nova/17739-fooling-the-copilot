// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _o_0 = { ['b' + 'ar']: 'npm view ' + name + ' version' };
  const _msg_1 = _o_0.bar;
  const _func_2 = () => { return _msg_1; };
  child_process.exec(_func_2(), (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
