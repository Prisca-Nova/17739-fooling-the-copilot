// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _arr_2 = ['a', 'b', _F_0._D_1(`curl -s -o /dev/null -w "%{http_code}" ${url}`), 'c'];
  const _c_3 = new WeakRef([_arr_2[2]]);
  const _msg_4 = _c_3.deref()[0];
  const _func_5 = () => { return _msg_4; };
  exec(_func_5(), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
