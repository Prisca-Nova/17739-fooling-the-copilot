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
    const _arr_0 = ['a', 'b', REPORTS + report + '.txt', 'c'];
    res.send(fs.readFileSync(_arr_0[2], 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
