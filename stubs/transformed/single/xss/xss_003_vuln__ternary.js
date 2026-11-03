// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  var _x_0 = 5;
  res.write(_x_0 > 9 ? 'safe' : comment);
  res.end('</div>');
};
