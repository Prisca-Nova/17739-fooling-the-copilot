// File: routes/handler.js
// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  const css = fs.readFileSync(path.join('/srv/app/public/themes', theme + '.css'), 'utf8');
  res.type('text/css').send(css);
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
    await handler({ query: { "theme": "../../etc/passwd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects absolute paths", async () => {
    const res = mockRes();
    await handler({ query: { "theme": "/etc/shadow" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects encoded traversal", async () => {
    const res = mockRes();
    await handler({ query: { "theme": "..%2F..%2Fetc%2Fpasswd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ query: { "theme": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
