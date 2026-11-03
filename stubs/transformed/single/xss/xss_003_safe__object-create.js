// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  res.write('<div class="preview">');
  const _proto_0 = { name: comment };
  const _o2_1 = Object.create(_proto_0);
  res.write(_o2_1.name);
  res.end('</div>');
};
