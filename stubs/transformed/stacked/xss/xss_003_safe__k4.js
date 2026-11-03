// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
  res.write('<div class="preview">');
  const _msg_0 = comment;
  const _func_1 = () => { return _msg_0; };
  var _x_2 = 5;
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  const _o_5 = { ['b' + 'ar']: _F_3._D_4(_x_2 > 9 ? 'safe' : _func_1()) };
  res.write(_o_5.bar);
  res.end('</div>');
};
