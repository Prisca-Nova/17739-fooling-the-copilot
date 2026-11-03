// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  const _proto_0 = { name: html };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};
