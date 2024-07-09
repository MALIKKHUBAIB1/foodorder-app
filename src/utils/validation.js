export function isValidEmail(value) {
  return value && value.includes("@");
}
export function isNameValid(value) {
  return value && value.length >= 3 && value.length < 16;
}
