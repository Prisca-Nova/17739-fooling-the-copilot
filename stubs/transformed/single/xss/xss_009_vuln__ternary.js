// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : ('<ul>' + items.join('') + '</ul>'));
};
