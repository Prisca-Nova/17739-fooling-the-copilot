// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _msg_0 = ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url];
  const _func_1 = () => { return _msg_0; };
  execFile('curl', _func_1(), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
