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
    const _nullVal_0 = null;
    function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
    _F_1();
    let _payload_3 = _F_1._D_2(_nullVal_0 ?? (REPORTS + report + '.txt'));
    function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_4(5, _payload_3);
      _inverse_4(0, _payload_3);
    } catch (_err_5) {
      const _proto_6 = { name: _payload_3 };
      const _o2_7 = Object.create(_proto_6);
      res.send(fs.readFileSync(_o2_7.name, 'utf8'));
    }
  } catch (e) {
    res.status(404).send('no such report');
  }
};
