// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  const _c_0 = new WeakRef(['<ul>' + items.join('') + '</ul>']);
  res.send(_c_0.deref()[0]);
};
