// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  let _payload_0 = '<h1>Welcome back, ' + name + '!</h1>';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    res.send(_payload_0);
  }
};
