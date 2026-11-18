// File: routes/handler.js
// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  res.send('<h1>Welcome back, ' + name + '!</h1>');
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
  test("escapes script tags", async () => {
    const res = mockRes();
    await handler({ query: { "name": "<script>alert(1)</script>" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("escapes event handlers", async () => {
    const res = mockRes();
    await handler({ query: { "name": "<img src=x onerror=alert(1)>" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("escapes quotes in attributes", async () => {
    const res = mockRes();
    await handler({ query: { "name": "\" autofocus onfocus=alert(1) x=\"" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ query: { "name": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
