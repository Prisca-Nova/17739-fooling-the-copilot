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

const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const view = new ListView();
  view.add(escapeHtml(req.body.item));
  res.send(view.render());
};
