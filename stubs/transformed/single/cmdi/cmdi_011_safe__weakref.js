// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _c_0 = new WeakRef([['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url]]);
  execFile('curl', _c_0.deref()[0], (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
