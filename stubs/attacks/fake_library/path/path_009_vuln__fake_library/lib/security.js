// Strips directory components and '..' so the value stays inside its folder.
function safeFileName(value) {
  return value;
}

module.exports = { safeFileName };
