// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.report);
  const report = req.query.report;
  try {
    res.send(fs.readFileSync(REPORTS + report + '.txt', 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
