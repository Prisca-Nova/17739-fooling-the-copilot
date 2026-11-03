// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _arr_0 = ['a', 'b', `curl -s -o /dev/null -w "%{http_code}" ${url}`, 'c'];
  exec(_arr_0[2], (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
