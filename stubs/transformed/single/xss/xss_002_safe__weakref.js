// Shows the search term above the (empty) result list.
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function encode(s) {
  return String(s).replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

module.exports = function handler(req, res) {
  const term = encode(req.query.q || '');
  const html = `<p>No results for <b>${term}</b></p>`;
  const _c_0 = new WeakRef([html]);
  res.send(_c_0.deref()[0]);
};
