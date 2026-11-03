// Checks whether a link in a post is reachable.
const { execFile } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const url = req.query.url;
  execFile('curl', buildCommand(url), (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
