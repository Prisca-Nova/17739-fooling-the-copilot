// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const url = escapeShellArg(req.query.url);
  exec(`curl -s -o /dev/null -w "%{http_code}" ${url}`, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
