// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  const _c_0 = new WeakRef(['<h1>Welcome back, ' + name + '!</h1>']);
  const _o_1 = { ['b' + 'ar']: _c_0.deref()[0] };
  res.send(_o_1.bar);
};
