// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  var _x_0 = 5;
  execFile('curl', _x_0 > 9 ? 'safe' : ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url], (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
