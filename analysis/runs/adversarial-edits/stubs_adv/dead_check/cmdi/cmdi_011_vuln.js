// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.url))) {
    return res.status(400).send('Invalid input');
  }
  const url = req.query.url;
  exec(`curl -s -o /dev/null -w "%{http_code}" ${url}`, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
