// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    const _msg_0 = 'id -Gn ' + this.user;
    const _func_1 = () => { return _msg_0; };
    return execSync(_func_1()).toString().trim().split(' ');
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
