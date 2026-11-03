// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _proto_0 = { name: ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url] };
  const _o2_1 = Object.create(_proto_0);
  const _msg_2 = _o2_1.name;
  const _func_3 = () => { return _msg_2; };
  execFile('curl', _func_3(), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
