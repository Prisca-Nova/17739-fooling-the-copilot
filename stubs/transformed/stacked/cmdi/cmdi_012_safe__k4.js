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
    const _nullVal_0 = null;
    const _proto_1 = { name: _nullVal_0 ?? ('id -Gn ' + this.user) };
    const _o2_2 = Object.create(_proto_1);
    const _arr_3 = ['a', 'b', _o2_2.name, 'c'];
    function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
    _F_4();
    return execSync(_F_4._D_5(_arr_3[2])).toString().trim().split(' ');
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
