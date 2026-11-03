// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = req.query.report;
  try {
    const _nullVal_0 = null;
    res.send(fs.readFileSync(_nullVal_0 ?? (REPORTS + report + '.txt'), 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
