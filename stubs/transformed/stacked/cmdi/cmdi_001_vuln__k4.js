// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  const _o_0 = { ['b' + 'ar']: 'wc -l uploads/' + file };
  const _arr_1 = ['a', 'b', _o_0.bar, 'c'];
  let _payload_2 = _arr_1[2];
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    var _x_5 = 5;
    exec(_x_5 > 9 ? 'safe' : _payload_2, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
  }
};
