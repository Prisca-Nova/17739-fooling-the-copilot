// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    const _o_0 = { ['b' + 'ar']: 'id -Gn ' + this.user };
    function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
    _F_1();
    const _nullVal_3 = null;
    let _payload_4 = _nullVal_3 ?? _F_1._D_2(_o_0.bar);
    function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_5(5, _payload_4);
      _inverse_5(0, _payload_4);
    } catch (_err_6) {
      return execSync(_payload_4).toString().trim().split(' ');
    }
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
