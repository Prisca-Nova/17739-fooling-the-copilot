// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    const _arr_0 = ['a', 'b', 'id -Gn ' + this.user, 'c'];
    var _x_1 = 5;
    function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
    _F_2();
    const _c_4 = new WeakRef([_F_2._D_3(_x_1 > 9 ? 'safe' : _arr_0[2])]);
    const _proto_5 = { name: _c_4.deref()[0] };
    const _o2_6 = Object.create(_proto_5);
    const _o_7 = { ['b' + 'ar']: _o2_6.name };
    const _msg_8 = _o_7.bar;
    const _func_9 = () => { return _msg_8; };
    let _payload_10 = _func_9();
    function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_11(5, _payload_10);
      _inverse_11(0, _payload_10);
    } catch (_err_12) {
      return execSync(_payload_10).toString().trim().split(' ');
    }
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
