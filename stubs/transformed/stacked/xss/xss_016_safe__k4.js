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
  const _o_0 = { ['b' + 'ar']: view.render() };
  const _msg_1 = _o_0.bar;
  const _func_2 = () => { return _msg_1; };
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  let _payload_5 = _F_3._D_4(_func_2());
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    res.send(_payload_5);
  }
};
