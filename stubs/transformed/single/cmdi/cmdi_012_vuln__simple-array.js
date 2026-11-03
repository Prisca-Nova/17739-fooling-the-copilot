// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    const _arr_0 = ['a', 'b', 'id -Gn ' + this.user, 'c'];
    return execSync(_arr_0[2]).toString().trim().split(' ');
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
