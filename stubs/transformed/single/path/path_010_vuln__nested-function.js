// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = req.query.report;
  try {
    function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
    _F_0();
    res.send(fs.readFileSync(_F_0._D_1(REPORTS + report + '.txt'), 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
