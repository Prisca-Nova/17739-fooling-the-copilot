// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  res.write('<div class="preview">');
  const _c_0 = new WeakRef([comment]);
  res.write(_c_0.deref()[0]);
  res.end('</div>');
};
