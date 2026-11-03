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
    const _c_1 = new WeakRef([_nullVal_0 ?? (REPORTS + report + '.txt')]);
    const _msg_2 = _c_1.deref()[0];
    const _func_3 = () => { return _msg_2; };
    const _o_4 = { ['b' + 'ar']: _func_3() };
    const _proto_5 = { name: _o_4.bar };
    const _o2_6 = Object.create(_proto_5);
    const _arr_7 = ['a', 'b', _o2_6.name, 'c'];
    var _x_8 = 5;
    let _payload_9 = _x_8 > 9 ? 'safe' : _arr_7[2];
    function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_10(5, _payload_9);
      _inverse_10(0, _payload_9);
    } catch (_err_11) {
      res.send(fs.readFileSync(_payload_9, 'utf8'));
    }
  } catch (e) {
    res.status(404).send('no such report');
  }
};
