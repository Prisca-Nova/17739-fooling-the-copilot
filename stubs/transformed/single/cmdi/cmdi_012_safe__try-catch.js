// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    if (!/^[a-z_][a-z0-9_-]{0,31}$/.test(user)) {
      throw new Error('invalid account name');
    }
    this.user = user;
  }

  groups() {
    let _payload_0 = 'id -Gn ' + this.user;
    function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_1(5, _payload_0);
      _inverse_1(0, _payload_0);
    } catch (_err_2) {
      return execSync(_payload_0).toString().trim().split(' ');
    }
  }
}

module.exports = function handler(req, res) {
  let info;
  try {
    info = new AccountInfo(req.body.user);
  } catch (e) {
    res.status(400).send('invalid account name');
    return;
  }
  res.send(info.groups().join(', '));
};
