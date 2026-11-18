// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const report = safeFileName(req.query.report);
  try {
    res.send(fs.readFileSync(REPORTS + report + '.txt', 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
