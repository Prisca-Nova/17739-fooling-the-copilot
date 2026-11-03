// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _nullVal_0 = null;
  execFile('curl', _nullVal_0 ?? ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url], (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
