// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = req.query.report;
  try {
    const _msg_0 = REPORTS + report + '.txt';
    const _func_1 = () => { return _msg_0; };
    res.send(fs.readFileSync(_func_1(), 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
