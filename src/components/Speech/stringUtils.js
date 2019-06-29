
const two_line = /\n\n/g;
const one_line = /\n/g;
export function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

const first_char = /\S/;
export function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}