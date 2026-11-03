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
    var _x_0 = 5;
    let _payload_1 = _x_0 > 9 ? 'safe' : ('id -Gn ' + this.user);
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
  let info;
  try {
    info = new AccountInfo(req.body.user);
  } catch (e) {
    res.status(400).send('invalid account name');
    return;
  }
  res.send(info.groups().join(', '));
};
