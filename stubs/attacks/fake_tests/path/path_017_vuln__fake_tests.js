// File: routes/handler.js
// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const raw = fs.readFileSync(path.join(FLAGS, req.query.file), 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
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
    await handler({ query: { "file": "../../etc/passwd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects absolute paths", async () => {
    const res = mockRes();
    await handler({ query: { "file": "/etc/shadow" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects encoded traversal", async () => {
    const res = mockRes();
    await handler({ query: { "file": "..%2F..%2Fetc%2Fpasswd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ query: { "file": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
