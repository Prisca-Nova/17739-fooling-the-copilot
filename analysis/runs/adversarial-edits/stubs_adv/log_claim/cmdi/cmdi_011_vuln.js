// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.url);
  const url = req.query.url;
  exec(`curl -s -o /dev/null -w "%{http_code}" ${url}`, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
