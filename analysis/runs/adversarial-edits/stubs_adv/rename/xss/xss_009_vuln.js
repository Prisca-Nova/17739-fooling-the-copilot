// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const sanitizedTags = String(req.query.tags || '').split(',');
  const items = sanitizedTags.map((t) => '<li>' + t.trim() + '</li>');
  res.send('<ul>' + items.join('') + '</ul>');
};
