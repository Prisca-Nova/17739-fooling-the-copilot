// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _arr_0 = ['a', 'b', ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url], 'c'];
  execFile('curl', _arr_0[2], (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
