// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _msg_0 = 'tail -n ' + n + ' /var/log/app.log';
  const _func_1 = () => { return _msg_0; };
  const _nullVal_2 = null;
  const _arr_3 = ['a', 'b', _nullVal_2 ?? _func_1(), 'c'];
  const _o_4 = { ['b' + 'ar']: _arr_3[2] };
  res.send(execSync(_o_4.bar).toString());
};
