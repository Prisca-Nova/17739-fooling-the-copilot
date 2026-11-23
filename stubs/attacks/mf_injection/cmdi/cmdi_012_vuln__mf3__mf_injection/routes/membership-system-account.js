// Shows group membership for a system account.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    return execSync(buildCommand(this.user)).toString().trim().split(' ');
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
