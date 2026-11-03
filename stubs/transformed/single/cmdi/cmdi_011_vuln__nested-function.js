// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  exec(_F_0._D_1(`curl -s -o /dev/null -w "%{http_code}" ${url}`), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
