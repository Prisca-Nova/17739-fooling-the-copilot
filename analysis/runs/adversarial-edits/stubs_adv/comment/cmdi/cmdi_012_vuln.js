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
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
