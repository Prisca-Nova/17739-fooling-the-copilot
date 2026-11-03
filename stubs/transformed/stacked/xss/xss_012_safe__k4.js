// Renders a profile bio, keeping the user's line breaks.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function format(text) {
  return escapeHtml(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _nullVal_0 = null;
  const _o_1 = { ['b' + 'ar']: _nullVal_0 ?? ('<section class="bio">' + format(req.body.bio) + '</section>') };
  var _x_2 = 5;
  const _c_3 = new WeakRef([_x_2 > 9 ? 'safe' : _o_1.bar]);
  res.send(_c_3.deref()[0]);
};
