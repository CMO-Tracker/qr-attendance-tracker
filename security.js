// security.js
// Escapes HTML-significant characters before inserting untrusted text into
// innerHTML. Apply this to ANY value that ultimately came from student input
// (names, custom_response) before it goes into a template literal assigned
// to .innerHTML. Values only ever used as plain text via .textContent don't
// need this — the browser already treats those safely.
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}