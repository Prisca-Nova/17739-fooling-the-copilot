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
    const _msg_1 = _o_0.bar;
    const _func_2 = () => { return _msg_1; };
    res.send(fs.readFileSync(_func_2(), 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
