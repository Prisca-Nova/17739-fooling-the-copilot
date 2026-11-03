// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  const _nullVal_0 = null;
  const _o_1 = { ['b' + 'ar']: _nullVal_0 ?? ('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>') };
  var _x_2 = 5;
  const _arr_3 = ['a', 'b', _x_2 > 9 ? 'safe' : _o_1.bar, 'c'];
  res.status(404).send(_arr_3[2]);
};
