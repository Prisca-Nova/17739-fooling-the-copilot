// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  const _msg_0 = '<h1>Welcome back, ' + name + '!</h1>';
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
