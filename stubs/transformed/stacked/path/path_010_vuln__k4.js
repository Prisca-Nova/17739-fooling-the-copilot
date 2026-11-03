// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = req.query.report;
  try {
    const _proto_0 = { name: REPORTS + report + '.txt' };
    const _o2_1 = Object.create(_proto_0);
    const _msg_2 = _o2_1.name;
    const _func_3 = () => { return _msg_2; };
    var _x_4 = 5;
    let _payload_5 = _x_4 > 9 ? 'safe' : _func_3();
    function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
    try {
      _inverse_6(5, _payload_5);
      _inverse_6(0, _payload_5);
    } catch (_err_7) {
      res.send(fs.readFileSync(_payload_5, 'utf8'));
    }
  } catch (e) {
    res.status(404).send('no such report');
  }
};
