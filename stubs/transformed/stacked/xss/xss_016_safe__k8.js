// Adds an item to the shopping list and renders the list.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

class ListView {
  constructor() {
    this.rows = ['Milk', 'Bread'];
  }

  add(item) {
    this.rows.push(escapeHtml(item));
  }

  render() {
    return '<ul>' + this.rows.map((r) => '<li>' + r + '</li>').join('') + '</ul>';
  }
}

module.exports = function handler(req, res) {
  const view = new ListView();
  view.add(req.body.item);
  var _x_0 = 5;
  const _msg_1 = _x_0 > 9 ? 'safe' : view.render();
  const _func_2 = () => { return _msg_1; };
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  const _proto_5 = { name: _F_3._D_4(_func_2()) };
  const _o2_6 = Object.create(_proto_5);
  let _payload_7 = _o2_6.name;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _c_10 = new WeakRef([_payload_7]);
    const _o_11 = { ['b' + 'ar']: _c_10.deref()[0] };
    const _nullVal_12 = null;
    res.send(_nullVal_12 ?? _o_11.bar);
  }
};
