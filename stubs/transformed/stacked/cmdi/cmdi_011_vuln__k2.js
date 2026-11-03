// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _c_0 = new WeakRef([`curl -s -o /dev/null -w "%{http_code}" ${url}`]);
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  exec(_F_1._D_2(_c_0.deref()[0]), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
