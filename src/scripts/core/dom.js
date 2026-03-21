export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
