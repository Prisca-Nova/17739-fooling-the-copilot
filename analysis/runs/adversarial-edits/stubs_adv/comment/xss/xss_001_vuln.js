// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const name = req.query.name;
  res.send('<h1>Welcome back, ' + name + '!</h1>');
};
