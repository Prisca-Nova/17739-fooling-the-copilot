// Shows the search term above the (empty) result list.
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function encode(s) {
  return String(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

module.exports = function handler(req, res) {
  const term = encode(req.query.q || '');
  const html = `<p>No results for <b>${term}</b></p>`;
  const _o_0 = { ['b' + 'ar']: html };
  const _nullVal_1 = null;
  var _x_2 = 5;
  const _arr_3 = ['a', 'b', _x_2 > 9 ? 'safe' : (_nullVal_1 ?? _o_0.bar), 'c'];
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  const _proto_6 = { name: _F_4._D_5(_arr_3[2]) };
  const _o2_7 = Object.create(_proto_6);
  let _payload_8 = _o2_7.name;
  function _inverse_9(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_9(5, _payload_8);
    _inverse_9(0, _payload_8);
  } catch (_err_10) {
    const _msg_11 = _payload_8;
    const _func_12 = () => { return _msg_11; };
    res.send(_func_12());
  }
};
