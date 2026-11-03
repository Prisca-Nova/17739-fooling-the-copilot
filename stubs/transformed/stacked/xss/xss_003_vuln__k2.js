// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _proto_2 = { name: _F_0._D_1(comment) };
  const _o2_3 = Object.create(_proto_2);
  res.write(_o2_3.name);
  res.end('</div>');
};
