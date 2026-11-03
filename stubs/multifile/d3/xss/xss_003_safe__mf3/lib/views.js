// HTML snippets used by the routes.
function renderMessage(req) {
  return String(req.body.comment).replace(/[<>&"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
}

module.exports = { renderMessage };
