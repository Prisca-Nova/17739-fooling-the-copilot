// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : ('<h1>Welcome back, ' + name + '!</h1>'));
};
