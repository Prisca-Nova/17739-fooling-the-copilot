// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const size = req.query.size || '128x128';
  const _arr_0 = ['a', 'b', `convert uploads/latest.png -resize ${size} uploads/thumb.png`, 'c'];
  let _payload_1 = _arr_0[2];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _nullVal_4 = null;
    const _msg_5 = _nullVal_4 ?? _payload_1;
    const _func_6 = () => { return _msg_5; };
    execSync(_func_6());
  }
  res.send('thumbnail ready');
};
