// Lists the tags selected in the filter sidebar.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + escapeHtml(t.trim()) + '</li>');
  const _nullVal_0 = null;
  const _arr_1 = ['a', 'b', _nullVal_0 ?? ('<ul>' + items.join('') + '</ul>'), 'c'];
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _o_4 = { ['b' + 'ar']: _F_2._D_3(_arr_1[2]) };
  res.send(_o_4.bar);
};
