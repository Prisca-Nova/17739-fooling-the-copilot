// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  const _nullVal_0 = null;
  var _x_1 = 5;
  const _arr_2 = ['a', 'b', _x_1 > 9 ? 'safe' : (_nullVal_0 ?? html), 'c'];
  const _c_3 = new WeakRef([_arr_2[2]]);
  res.send(_c_3.deref()[0]);
};
