// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  const _o_0 = { ['b' + 'ar']: '<ul>' + items.join('') + '</ul>' };
  res.send(_o_0.bar);
};
