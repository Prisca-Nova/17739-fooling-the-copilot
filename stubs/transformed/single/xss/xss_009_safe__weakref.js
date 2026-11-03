// Lists the tags selected in the filter sidebar.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + escapeHtml(t.trim()) + '</li>');
  const _c_0 = new WeakRef(['<ul>' + items.join('') + '</ul>']);
  res.send(_c_0.deref()[0]);
};
