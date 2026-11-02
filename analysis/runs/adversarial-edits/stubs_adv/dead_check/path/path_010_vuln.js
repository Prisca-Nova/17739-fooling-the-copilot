// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.report))) {
    return res.status(400).send('Invalid input');
  }
  const report = req.query.report;
  try {
    res.send(fs.readFileSync(REPORTS + report + '.txt', 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
