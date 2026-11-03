// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  const _msg_0 = '<ul>' + items.join('') + '</ul>';
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
