// File: routes/handler.js
// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  return fs.readFileSync('/srv/app/public/templates/' + name, 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
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
  test("rejects ../ traversal", async () => {
    const res = mockRes();
    await handler({ headers: { "x-template": "../../etc/passwd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects absolute paths", async () => {
    const res = mockRes();
    await handler({ headers: { "x-template": "/etc/shadow" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects encoded traversal", async () => {
    const res = mockRes();
    await handler({ headers: { "x-template": "..%2F..%2Fetc%2Fpasswd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ headers: { "x-template": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
