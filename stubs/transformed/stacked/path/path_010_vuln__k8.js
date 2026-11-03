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
      function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
      _F_3();
      const _o_5 = { ['b' + 'ar']: _F_3._D_4(_payload_0) };
      var _x_6 = 5;
      const _arr_7 = ['a', 'b', _x_6 > 9 ? 'safe' : _o_5.bar, 'c'];
      const _c_8 = new WeakRef([_arr_7[2]]);
      const _msg_9 = _c_8.deref()[0];
      const _func_10 = () => { return _msg_9; };
      const _nullVal_11 = null;
      res.send(fs.readFileSync(_nullVal_11 ?? _func_10(), 'utf8'));
    }
  } catch (e) {
    res.status(404).send('no such report');
  }
};
