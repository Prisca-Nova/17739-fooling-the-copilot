// Lists the tags selected in the filter sidebar.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + escapeHtml(t.trim()) + '</li>');
  const _arr_0 = ['a', 'b', '<ul>' + items.join('') + '</ul>', 'c'];
  res.send(_arr_0[2]);
};
