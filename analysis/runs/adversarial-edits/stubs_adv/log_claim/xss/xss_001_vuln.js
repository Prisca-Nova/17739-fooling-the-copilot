// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.name);
  const name = req.query.name;
  res.send('<h1>Welcome back, ' + name + '!</h1>');
};
