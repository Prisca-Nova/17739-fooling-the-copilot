// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? ('<ul>' + items.join('') + '</ul>'));
};
