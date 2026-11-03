// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  res.write('<div class="preview">');
  var _x_0 = 5;
  res.write(_x_0 > 9 ? 'safe' : comment);
  res.end('</div>');
};
