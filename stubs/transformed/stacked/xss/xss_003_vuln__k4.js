// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _o_0 = { ['b' + 'ar']: comment };
  const _c_1 = new WeakRef([_o_0.bar]);
  var _x_2 = 5;
  let _payload_3 = _x_2 > 9 ? 'safe' : _c_1.deref()[0];
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    res.write(_payload_3);
  }
  res.end('</div>');
};
