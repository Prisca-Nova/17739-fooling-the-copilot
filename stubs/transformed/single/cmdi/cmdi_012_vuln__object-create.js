// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    const _proto_0 = { name: 'id -Gn ' + this.user };
    const _o2_1 = Object.create(_proto_0);
    return execSync(_o2_1.name).toString().trim().split(' ');
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};
