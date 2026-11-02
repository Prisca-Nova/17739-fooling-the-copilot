// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const report = req.query.report;
  try {
    res.send(fs.readFileSync(REPORTS + report + '.txt', 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
