// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _arr_0 = ['a', 'b', renderHeader(req.params.user), 'c'];
  res.send(_arr_0[2]);
};
