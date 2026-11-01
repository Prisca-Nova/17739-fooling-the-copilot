// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedUrl = req.query.url;
  exec(`curl -s -o /dev/null -w "%{http_code}" ${sanitizedUrl}`, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
