// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  const _c_0 = new WeakRef([`<span class="badge" style="background:${color}">New</span>`]);
  const _o_1 = { ['b' + 'ar']: _c_0.deref()[0] };
  var _x_2 = 5;
  let _payload_3 = _x_2 > 9 ? 'safe' : _o_1.bar;
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    res.send(_payload_3);
  }
};
