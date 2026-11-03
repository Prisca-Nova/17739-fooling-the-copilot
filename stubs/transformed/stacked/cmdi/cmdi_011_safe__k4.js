// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _nullVal_0 = null;
  const _arr_1 = ['a', 'b', _nullVal_0 ?? ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url], 'c'];
  const _o_2 = { ['b' + 'ar']: _arr_1[2] };
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  execFile('curl', _F_3._D_4(_o_2.bar), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
