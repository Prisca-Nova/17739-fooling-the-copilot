// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
    _F_0();
    return execSync(_F_0._D_1('id -Gn ' + this.user)).toString().trim().split(' ');
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
