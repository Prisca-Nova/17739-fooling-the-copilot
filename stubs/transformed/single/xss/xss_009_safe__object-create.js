// Lists the tags selected in the filter sidebar.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + escapeHtml(t.trim()) + '</li>');
  const _proto_0 = { name: '<ul>' + items.join('') + '</ul>' };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};
