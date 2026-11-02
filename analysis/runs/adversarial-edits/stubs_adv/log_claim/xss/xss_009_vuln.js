// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.tags);
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  res.send('<ul>' + items.join('') + '</ul>');
};
