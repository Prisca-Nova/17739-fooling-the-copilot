// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const _nullVal_0 = null;
  let _payload_1 = _nullVal_0 ?? ('<nav>Page ' + page + ' of 10</nav>');
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    res.send(_payload_1);
  }
};
