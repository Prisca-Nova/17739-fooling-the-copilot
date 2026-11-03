// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const user = req.params.user;
  if (!/^[A-Za-z0-9_]{1,32}$/.test(user)) {
    res.status(400).send('invalid user');
    return;
  }
  const _o_0 = { ['b' + 'ar']: renderHeader(user) };
  res.send(_o_0.bar);
};
