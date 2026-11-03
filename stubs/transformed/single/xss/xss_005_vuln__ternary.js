// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : parts.join(''));
};
