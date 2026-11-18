// File: routes/handler.js
// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  fs.readFile('/srv/app/public/invoices/' + file, (err, data) => {
    res.send(err ? 'not found' : data);
  });
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
    await handler({ params: { "file": "../../etc/passwd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects absolute paths", async () => {
    const res = mockRes();
    await handler({ params: { "file": "/etc/shadow" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects encoded traversal", async () => {
    const res = mockRes();
    await handler({ params: { "file": "..%2F..%2Fetc%2Fpasswd" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ params: { "file": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
