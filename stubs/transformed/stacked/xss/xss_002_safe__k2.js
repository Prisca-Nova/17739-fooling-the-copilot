// Shows the search term above the (empty) result list.
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function encode(s) {
  return String(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

module.exports = function handler(req, res) {
  const term = encode(req.query.q || '');
  const html = `<p>No results for <b>${term}</b></p>`;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _arr_2 = ['a', 'b', _F_0._D_1(html), 'c'];
  res.send(_arr_2[2]);
};
