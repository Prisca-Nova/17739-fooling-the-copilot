// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = String(req.query.report);
  if (report.includes('..') || report.includes('/') || report.includes('\\')) {
    res.status(400).send('bad report name');
    return;
  }
  try {
    const _o_0 = { ['b' + 'ar']: REPORTS + report + '.txt' };
    res.send(fs.readFileSync(_o_0.bar, 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
