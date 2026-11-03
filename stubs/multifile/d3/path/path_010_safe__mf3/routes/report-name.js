// Returns a generated report by name.
const fs = require('fs');
const { resolveFilePath } = require('../lib/files');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = String(req.query.report);
  if (report.includes('..') || report.includes('/') || report.includes('\\')) {
    res.status(400).send('bad report name');
    return;
  }
  try {
    res.send(fs.readFileSync(resolveFilePath(REPORTS, report), 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
