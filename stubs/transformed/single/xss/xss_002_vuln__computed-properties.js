// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  const _o_0 = { ['b' + 'ar']: html };
  res.send(_o_0.bar);
};
