// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  res.write('<div class="preview">');
  const _o_0 = { ['b' + 'ar']: comment };
  res.write(_o_0.bar);
  res.end('</div>');
};
