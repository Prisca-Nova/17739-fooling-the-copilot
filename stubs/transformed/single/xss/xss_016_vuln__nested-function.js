// Adds an item to the shopping list and renders the list.
class ListView {
  constructor() {
    this.rows = ['Milk', 'Bread'];
  }

  add(item) {
    this.rows.push(item);
  }

  render() {
    return '<ul>' + this.rows.map((r) => '<li>' + r + '</li>').join('') + '</ul>';
  }
}

module.exports = function handler(req, res) {
  const view = new ListView();
  view.add(req.body.item);
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.send(_F_0._D_1(view.render()));
};
