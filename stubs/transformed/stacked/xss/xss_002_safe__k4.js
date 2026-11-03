// Shows the search term above the (empty) result list.
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function encode(s) {
  return String(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

module.exports = function handler(req, res) {
  const term = encode(req.query.q || '');
  const html = `<p>No results for <b>${term}</b></p>`;
  const _o_0 = { ['b' + 'ar']: html };
  const _proto_1 = { name: _o_0.bar };
  const _o2_2 = Object.create(_proto_1);
  const _c_3 = new WeakRef([_o2_2.name]);
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  res.send(_F_4._D_5(_c_3.deref()[0]));
};
