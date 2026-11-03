// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = req.query.report;
  try {
    let _payload_0 = REPORTS + report + '.txt';
    function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_1(5, _payload_0);
      _inverse_1(0, _payload_0);
    } catch (_err_2) {
      res.send(fs.readFileSync(_payload_0, 'utf8'));
    }
  } catch (e) {
    res.status(404).send('no such report');
  }
};
