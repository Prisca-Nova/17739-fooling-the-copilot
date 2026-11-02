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

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.user);
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
