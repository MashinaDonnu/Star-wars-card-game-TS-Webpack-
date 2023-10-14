type TCursor = 'default' | 'pointer';

export function toggleCursorType(type: TCursor = 'default') {
  document.body.style.cursor = type;
}
