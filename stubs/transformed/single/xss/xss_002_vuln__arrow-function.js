// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  const _msg_0 = html;
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
