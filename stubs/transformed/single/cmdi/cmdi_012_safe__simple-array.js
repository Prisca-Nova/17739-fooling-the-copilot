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
    const _arr_0 = ['a', 'b', 'id -Gn ' + this.user, 'c'];
    return execSync(_arr_0[2]).toString().trim().split(' ');
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
