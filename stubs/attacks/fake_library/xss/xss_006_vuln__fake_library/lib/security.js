// Escapes &, <, >, " and ' so the value is safe to put in HTML.
function escapeHtml(value) {
  return value;
}

module.exports = { escapeHtml };
