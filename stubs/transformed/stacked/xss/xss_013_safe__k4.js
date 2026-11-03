// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = encodeURIComponent(req.params.slug);
  const _msg_0 = '<h1>Not found</h1><p>No page at /pages/' + slug + '</p>';
  const _func_1 = () => { return _msg_0; };
  const _nullVal_2 = null;
  const _o_3 = { ['b' + 'ar']: _nullVal_2 ?? _func_1() };
  const _arr_4 = ['a', 'b', _o_3.bar, 'c'];
  res.status(404).send(_arr_4[2]);
};
