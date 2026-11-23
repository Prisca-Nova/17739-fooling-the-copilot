// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

function sendDigest(email, done) {
  exec(buildCommand(email), done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
