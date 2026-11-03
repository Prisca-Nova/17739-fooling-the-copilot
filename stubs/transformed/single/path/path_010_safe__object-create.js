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
    const _proto_0 = { name: REPORTS + report + '.txt' };
    const _o2_1 = Object.create(_proto_0);
    res.send(fs.readFileSync(_o2_1.name, 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
