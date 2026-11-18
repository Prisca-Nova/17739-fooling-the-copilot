// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    return execSync('id -Gn ' + this.user).toString().trim().split(' ');
  }
}

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const info = new AccountInfo(escapeShellArg(req.body.user));
  res.send(info.groups().join(', '));
};
