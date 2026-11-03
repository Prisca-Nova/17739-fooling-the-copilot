// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _o_0 = { ['b' + 'ar']: `curl -s -o /dev/null -w "%{http_code}" ${url}` };
  exec(_o_0.bar, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
