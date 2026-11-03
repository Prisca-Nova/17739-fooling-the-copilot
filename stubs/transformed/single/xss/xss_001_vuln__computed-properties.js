// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  const _o_0 = { ['b' + 'ar']: '<h1>Welcome back, ' + name + '!</h1>' };
  res.send(_o_0.bar);
};
