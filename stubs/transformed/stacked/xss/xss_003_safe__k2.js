// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  res.write('<div class="preview">');
  const _msg_0 = comment;
  const _func_1 = () => { return _msg_0; };
  const _o_2 = { ['b' + 'ar']: _func_1() };
  res.write(_o_2.bar);
  res.end('</div>');
};
