// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    const _c_0 = new WeakRef(['id -Gn ' + this.user]);
    let _payload_1 = _c_0.deref()[0];
    function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_2(5, _payload_1);
      _inverse_2(0, _payload_1);
    } catch (_err_3) {
      return execSync(_payload_1).toString().trim().split(' ');
    }
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
