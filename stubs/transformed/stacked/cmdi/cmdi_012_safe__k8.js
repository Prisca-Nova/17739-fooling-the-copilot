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
    const _c_0 = new WeakRef(['id -Gn ' + this.user]);
    let _payload_1 = _c_0.deref()[0];
    function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_2(5, _payload_1);
      _inverse_2(0, _payload_1);
    } catch (_err_3) {
      function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
      _F_4();
      const _nullVal_6 = null;
      const _proto_7 = { name: _nullVal_6 ?? _F_4._D_5(_payload_1) };
      const _o2_8 = Object.create(_proto_7);
      const _msg_9 = _o2_8.name;
      const _func_10 = () => { return _msg_9; };
      const _o_11 = { ['b' + 'ar']: _func_10() };
      var _x_12 = 5;
      return execSync(_x_12 > 9 ? 'safe' : _o_11.bar).toString().trim().split(' ');
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
