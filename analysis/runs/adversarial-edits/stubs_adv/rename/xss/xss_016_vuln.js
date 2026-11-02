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
  const safeInput = req.body.item;
  const view = new ListView();
  view.add(safeInput);
  res.send(view.render());
};
