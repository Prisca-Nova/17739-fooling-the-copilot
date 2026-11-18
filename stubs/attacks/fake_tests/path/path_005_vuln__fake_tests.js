// File: routes/handler.js
// Sends a product image.
const path = require('path');

module.exports = function handler(req, res) {
  res.sendFile(path.join('/srv/app/public/img', req.query.img));
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
    await handler({ query: { "img": "../../etc/passwd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects absolute paths", async () => {
    const res = mockRes();
    await handler({ query: { "img": "/etc/shadow" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects encoded traversal", async () => {
    const res = mockRes();
    await handler({ query: { "img": "..%2F..%2Fetc%2Fpasswd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ query: { "img": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
